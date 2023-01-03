import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import GppGoodIcon from "@mui/icons-material/GppGood";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";
import LockIcon from "@mui/icons-material/Lock";
import ShieldIcon from "@mui/icons-material/Shield";
import CheckIcon from "@mui/icons-material/Check";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import DeleteIcon from "@mui/icons-material/Delete";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import TextSnippetSharpIcon from "@mui/icons-material/TextSnippetSharp";
import RadioButtonCheckedSharpIcon from "@mui/icons-material/RadioButtonCheckedSharp";
import { ArchivedChatsIcon, MessengerIcon, PrivacyHomeIcon, SegmentIcon, FilesIcon, LikeIcon, NicknameIcon } from "../Icons";
import { removeGroup } from "../features/ChatGroup/ChatGroupSlice";
import { logout } from "../features/AuthSlice";
import { useNavigate } from "react-router-dom";
import { configRoutes } from "../routes/routes";
const AvatarMenu = () => [
    {
        icon: <SettingsIcon />,
        title: "Preferences",
        to: "/",
        child: null,
        groupIndex: 1,
    },
    {
        icon: <PrivacyHomeIcon />,
        title: "Privacy & safety",
        to: "/",
        groupIndex: 2,
        child: {
            title: "Privacy & safety",
            data: [
                {
                    icon: <GppGoodIcon />,
                    title: "End-to-end encrypted chats",
                    to: "/",
                    child: {
                        title: "End-to-end encrypted chats",
                        data: [
                            {
                                icon: <LockIcon />,
                                title: "Security alerts",
                                to: "/",
                                child: null,
                            },
                            {
                                icon: <ShieldIcon />,
                                title: "Login",
                                to: "/",
                                child: null,
                            },
                        ],
                    },
                },
            ],
        },
    },
    {
        icon: <HelpIcon />,
        title: "Help",
        to: "/",
        child: null,
        groupIndex: 3,
    },
    {
        icon: <ReportProblemIcon />,
        title: "Report a problem",
        to: "/",
        child: null,
        groupIndex: 3,
    },
    {
        icon: <InfoIcon />,
        title: "About",
        to: "/",
        child: null,
        groupIndex: 4,
    },
    {
        icon: <SegmentIcon />,
        title: "Terms",
        to: "/",
        child: null,
        groupIndex: 4,
    },
    {
        icon: <SegmentIcon />,
        title: "Data Policy",
        to: "/",
        child: null,
        groupIndex: 4,
    },
    {
        icon: <SegmentIcon />,
        title: "Cookie Policy",
        to: "/",
        child: null,
        groupIndex: 4,
    },
    {
        icon: <MessengerIcon />,
        title: "New! Messenger for Windows",
        to: "/",
        child: null,
        groupIndex: 5,
    },
    {
        icon: <LogoutIcon />,
        title: "Log out",
        to: "/",
        child: null,
        groupIndex: 5,
        onClickDispatch: () => logout(),
        callback: (func) => {
            func(configRoutes.login);
        },
    },
];
const MessageItemMenu = (data) => [
    {
        icon: <CheckIcon />,
        title: "Mark as read",
        to: "/",
        child: null,
        groupIndex: 1,
    },
    {
        icon: <NotificationsIcon />,
        title: "Mute notifications",
        to: "/",
        child: null,
        groupIndex: 1,
    },
    {
        icon: <PersonIcon />,
        title: "View profile",
        to: "/",
        child: null,
        groupIndex: 1,
    },
    {
        icon: <LockIcon />,
        title: "Start end-to-end encrypted chat",
        to: "/",
        child: null,
        groupIndex: 2,
    },
    {
        icon: <CallIcon />,
        title: "Audio call",
        to: "/",
        child: null,
        groupIndex: 3,
    },
    {
        icon: <VideocamIcon />,
        title: "Video chat",
        to: "/",
        child: null,
        groupIndex: 3,
    },
    {
        icon: <ArchivedChatsIcon />,
        title: "Archive chat",
        to: "/",
        child: null,
        groupIndex: 4,
    },
    {
        icon: <DeleteIcon />,
        title: "Delete chat",
        to: "/",
        child: null,
        groupIndex: 4,
        onClickDispatch: () => removeGroup(data),
    },
    {
        icon: <ReportProblemIcon />,
        title: "Report",
        to: "/",
        child: null,
        groupIndex: 4,
    },
];
const ConversationMenu = [
    {
        nodeId: "1",
        labelText: "Customize chats",

        childrenNodes: [
            {
                nodeId: "4",
                labelText: "Change theme",
                labelIcon: RadioButtonCheckedSharpIcon,
                labelIconColor: "#0084ff",
            },
            {
                nodeId: "5",
                labelText: "Change emoji",
                labelIcon: LikeIcon,
            },
            {
                nodeId: "6",
                labelText: "Edit nicknames",
                labelIcon: NicknameIcon,
            },
        ],
    },
    {
        nodeId: "2",
        labelText: "Media, files and links",
        childrenNodes: [
            {
                nodeId: "7",
                labelText: "Media",
                labelIcon: PermMediaOutlinedIcon,
            },
            {
                nodeId: "8",
                labelText: "Files",
                labelIcon: TextSnippetSharpIcon,
            },
            {
                nodeId: "9",
                labelText: "Links",
                labelIcon: FilesIcon,
            },
        ],
    },
    {
        nodeId: "3",
        labelText: "Privacy & support",
        childrenNodes: [],
    },
];
export { AvatarMenu, MessageItemMenu, ConversationMenu };
