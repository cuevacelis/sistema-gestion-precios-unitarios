import useCloseOnEscape from "@/hooks/useCloseOnEscape";
import clsx from "clsx";
import { useState } from "react";
import { FixedSizeList as List } from "react-window";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface IProps {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  selectionType: "single" | "multiple";
  titleSelect: string | undefined;
  listElements?: Array<{ key: string; name: string }>;
  selectedItem: Array<{ key: string; name: string }>;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<
      {
        key: string;
        name: string;
      }[]
    >
  >;
  isVirtualized: boolean;
  isTooltip?: boolean;
}

export default function CustomMenuDropdownComponent(props: IProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const MAX_HEIGHT = 160;
  const MAX_ITEM_SIZE = 26;
  const LIST_HEIGHT = props.listElements?.reduce(
    (acc, _) => acc + MAX_ITEM_SIZE,
    0
  );
  const TOTAL_HEIGHT = Math.min(Number(LIST_HEIGHT), MAX_HEIGHT);
  useCloseOnEscape(() => props.setIsShow(false));

  const resultArraySearch = searchValue
    ? props.listElements?.filter((le) =>
        le.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    : props.listElements;

  const handleSelectedAll = () => {
    props.setSelectedItem(props.listElements ?? []);
  };

  const handleUnselectedAll = () => {
    props.setSelectedItem([]);
  };

  const handleNewSelectedUnique = (le: { key: string; name: string }) => {
    const found = props.selectedItem.find((e) => e.key === le.key);
    if (found) {
      props.setSelectedItem([]);
    } else {
      props.setSelectedItem([le]);
    }
    props.setIsShow(false);
  };

  const handleNewSelectedsMultiple = (le: { key: string; name: string }) => {
    const found = props.selectedItem.find((e) => e.key === le.key);
    if (found) {
      const newArray = props.selectedItem.filter((e) => found?.key !== e?.key);
      props.setSelectedItem(newArray);
    } else {
      props.setSelectedItem((prev) => [...prev, le]);
    }
  };

  const keyPressEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (Array.isArray(resultArraySearch) && resultArraySearch[0]?.key) {
        const firstResultSearch = resultArraySearch[0];
        props.selectionType === "single"
          ? handleNewSelectedUnique(firstResultSearch)
          : handleNewSelectedsMultiple(firstResultSearch);
      }
    }
  };

  const RowWithoutVirtualized = () => {
    return (
      <div style={{ overflow: "auto", maxHeight: "160px" }}>
        {resultArraySearch?.map((le) => (
          <div
            role="button"
            key={le.key}
            data-index={le.key}
            onClick={(e) => {
              e.preventDefault();
              props.selectionType === "single"
                ? handleNewSelectedUnique(le)
                : handleNewSelectedsMultiple(le);
            }}
            className={clsx(
              "d-flex align-items-end dropdown-item text-truncate",
              {
                active: props.selectedItem?.find((e) => e.key === le.key),
              }
            )}
          >
            {props?.isTooltip ? (
              <Tooltip>
                <TooltipTrigger>
                  <span style={{ maxWidth: "100%" }} className="ps-3">
                    {le.name}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="tooltip-general">
                  {le.name}
                </TooltipContent>
              </Tooltip>
            ) : (
              <span style={{ maxWidth: "100%" }} className="ps-3">
                {le.name}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const RowWithVirtualized = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    if (!resultArraySearch) return null;
    const le = resultArraySearch[index];
    return (
      <div
        role="button"
        style={style}
        key={le.key}
        data-index={le.key}
        onClick={(e) => {
          e.preventDefault();
          props.selectionType === "single"
            ? handleNewSelectedUnique(le)
            : handleNewSelectedsMultiple(le);
        }}
        className={clsx("d-flex align-items-end dropdown-item text-truncate", {
          active: props.selectedItem?.find((e) => e.key === le.key),
        })}
      >
        {props?.isTooltip ? (
          <Tooltip>
            <TooltipTrigger>
              <span style={{ maxWidth: "100%" }} className="ps-3">
                {le.name}
              </span>
            </TooltipTrigger>
            <TooltipContent className="tooltip-general">
              {le.name}
            </TooltipContent>
          </Tooltip>
        ) : (
          <span style={{ maxWidth: "100%" }} className="ps-3">
            {le.name}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className="mt-1 pb-1 w-full"
      style={{ maxHeight: "initial" }}
    >
      <div className="d-flex flex-column px-2 pb-2 border-bottom">
        <Input
          type="search"
          autoFocus
          className="form-control-sm me-auto"
          placeholder="Buscar.."
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          onKeyDown={keyPressEnter}
        />
        {props.selectionType === "multiple" && (
          <div className="flex flex-row justify-between my-2 gap-4">
            <Button
              onClick={handleSelectedAll}
            >
              Selec. todos
            </Button>
            <Button
              onClick={handleUnselectedAll}
            >
              Desmarcar todos
            </Button>
          </div>
        )}
      </div>
      {props.titleSelect && (
        <h6 className="dropdown-header text-uppercase text-start my-0 w-100 rounded-0 py-1 bg-secondary text-bg-secondary">
          {props.titleSelect}
        </h6>
      )}
      {props.isVirtualized ? (
        <List
          layout="vertical"
          height={TOTAL_HEIGHT}
          itemSize={MAX_ITEM_SIZE}
          itemCount={resultArraySearch?.length || 0}
          width={"100%"}
        >
          {RowWithVirtualized}
        </List>
      ) : (
        <RowWithoutVirtualized />
      )}
    </div>
  );
}
