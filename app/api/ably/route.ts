import { auth } from "@/auth";
import Ably from "ably";

export const revalidate = 0;

export const GET = auth(async function GET(request) {
  try {
    if (!request.auth) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const client = new Ably.Rest(process.env.ABLY_API_KEY!);
    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: "ably-sgpu",
    });
    return Response.json(tokenRequestData);
  } catch (error) {
    return Response.json(
      { error: "Error fetching token request data" },
      { status: 500 }
    );
  }
});
