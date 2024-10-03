import { Input, InputGroup } from "@volocopter/design-library-react";
import { useSearchInputFieldTranslation } from "./translations/useSearchInputFieldTranslation";
import { useDebounceInput } from "./useDebounceInput";

export type SearchInputFieldProps = {
    onChange: (search: string) => void;
    value?: string;
};

export const SearchInputField = (props: SearchInputFieldProps) => {
    const { onChange, value } = props;
    const { t } = useSearchInputFieldTranslation();
    const { setValue } = useDebounceInput({ onAfterDebounce: onChange });

    return (
        <InputGroup size="md">
            <Input
                aria-label={t("Search")}
                fontSize="sm"
                placeholder={t("Search for")}
                variant="outline"
                onChange={(event) => setValue(event.target.value)}
                value={value}
            />
            <InputGroup.IconButtonRight icon="search" title={t("Search")} />
        </InputGroup>
    );
};
