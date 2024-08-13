import { getBrowserInfoBackend, sendEmail } from "@/lib/actions";
import { findUserByUsernameAndPassword } from "@/lib/services/sql-queries";
import { IBodyLogin } from "@/lib/types";
import { DateTime } from "luxon";

export async function POST(request: Request) {
  const { username, password, userAgent }: IBodyLogin = await request.json();
  const clientIp = request.headers.get("x-forwarded-for");
  const browserInfo = await getBrowserInfoBackend(userAgent);
  const browserName = browserInfo.browserName;
  const fullVersion = browserInfo.fullVersion;
  const os = browserInfo.os;
  const nowUTC = DateTime.utc();
  const nowPeru = nowUTC
    .setZone("America/Lima")
    .toFormat("yyyy-MM-dd HH:mm:ss");

  try {
    const res = await findUserByUsernameAndPassword({
      username: username,
      password: password,
    });

    if (res.length === 0) {
      return Response.json({ data: null, status: 400 });
    }
    sendEmail({
      to: res[0]?.usu_correo,
      subject: "Iniciaste sesión en SGPU",
      text: `Hola, te has iniciado sesión en SGPU desde una nueva ubicación.
             IP: ${clientIp}
             Navegador: ${userAgent}
             Hora UTC: ${nowUTC}
             Hora Perú: ${nowPeru}
             Navegador: ${browserName}
             Versión: ${fullVersion}
             Sistema Operativo: ${os}`,
      html: `
             <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
               <h2 style="color: #0056b3;">Nuevo inicio de sesión detectado en SGPU</h2>
               <p>Hola,</p>
               <p>Te has iniciado sesión en SGPU desde una nueva ubicación.</p>
               <p><strong>Detalles de la sesión:</strong></p>
               <ul style="list-style-type: none; padding-left: 0;">
                 <li><strong>IP:</strong> ${clientIp}</li>
                 <li><strong>Hora UTC:</strong> ${nowUTC}</li>
                 <li><strong>Hora Perú:</strong> ${nowPeru}</li>
                 <li><strong>Navegador:</strong> ${browserName}</li>
                 <li><strong>Versión:</strong> ${fullVersion}</li>
                 <li><strong>Sistema Operativo:</strong> ${os}</li>
               </ul>
               <p>Si no fuiste tú, por favor contacta con el soporte inmediatamente.</p>
               <p style="margin-top: 20px;">Gracias,</p>
               <p>El equipo de SGPU</p>
               <hr style="border: 0; border-top: 1px solid #ccc;" />
               <p style="font-size: 12px; color: #999;">Este es un correo electrónico automático, por favor no respondas a este mensaje.</p>
             </div>
           `,
    });
    return Response.json({
      data: {
        usu_id: res[0]?.usu_id,
        usu_correo: res[0]?.usu_correo,
        usu_nomapellidos: res[0]?.usu_nomapellidos,
      },
      status: 200,
    });
  } catch (error) {
    throw error;
  }
}
