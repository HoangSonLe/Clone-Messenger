import { Chip } from "@mui/material";
import GmailTreeView from "../../MessageContent/ConversationInformation/MenuTreeview";
import MultipleSelect from "../../ui-kit/Select/MultipleSelect";

function TestPage() {
    const funcTest = () => alert(12);
    return (
        <div>
            <Chip label="Deletable" onDelete={funcTest} />{" "}
        </div>
    );
}
export default TestPage;
