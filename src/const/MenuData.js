import CallIcon from "@mui/icons-material/Call";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import GppGoodIcon from "@mui/icons-material/GppGood";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import PersonIcon from "@mui/icons-material/Person";
import RadioButtonCheckedSharpIcon from "@mui/icons-material/RadioButtonCheckedSharp";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import SettingsIcon from "@mui/icons-material/Settings";
import ShieldIcon from "@mui/icons-material/Shield";
import TextSnippetSharpIcon from "@mui/icons-material/TextSnippetSharp";
import VideocamIcon from "@mui/icons-material/Videocam";
import { logout, logoutAsync } from "../features/AuthSlice";
import { removeGroup } from "../features/ChatGroupSlice";
import {
    ArchivedChatsIcon,
    FilesIcon,
    LikeIcon,
    MessengerIcon,
    NicknameIcon,
    PrivacyHomeIcon,
    SegmentIcon,
} from "../assets/Icons";
import { configRoutes } from "../routes/routes";
import authApi from "../api/authApi";
import { useDispatch } from "react-redux";
const AvatarMenu = () => {
    const dispatch = useDispatch();
    return [
        {
            id: 1,
            icon: <SettingsIcon />,
            title: "Preferences",
            to: "/",
            child: null,
            groupIndex: 1,
        },
        {
            id: 2,
            icon: <PrivacyHomeIcon />,
            title: "Privacy & safety",
            to: "/",
            groupIndex: 2,
            child: {
                title: "Privacy & safety",
                data: [
                    {
                        id: 11,
                        icon: <GppGoodIcon />,
                        title: "End-to-end encrypted chats",
                        to: "/",
                        child: {
                            title: "End-to-end encrypted chats",
                            data: [
                                {
                                    id: 12,
                                    icon: <LockIcon />,
                                    title: "Security alerts",
                                    to: "/",
                                    child: null,
                                },
                                {
                                    id: 13,
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
            id: 3,
            icon: <HelpIcon />,
            title: "Help",
            to: "/",
            child: null,
            groupIndex: 3,
        },
        {
            id: 4,
            icon: <ReportProblemIcon />,
            title: "Report a problem",
            to: "/",
            child: null,
            groupIndex: 3,
        },
        {
            id: 5,
            icon: <InfoIcon />,
            title: "About",
            to: "/",
            child: null,
            groupIndex: 4,
        },
        {
            id: 6,
            icon: <SegmentIcon />,
            title: "Terms",
            to: "/",
            child: null,
            groupIndex: 4,
        },
        {
            id: 7,
            icon: <SegmentIcon />,
            title: "Data Policy",
            to: "/",
            child: null,
            groupIndex: 4,
        },
        {
            id: 8,
            icon: <SegmentIcon />,
            title: "Cookie Policy",
            to: "/",
            child: null,
            groupIndex: 4,
        },
        {
            id: 9,
            icon: <MessengerIcon />,
            title: "New! Messenger for Windows",
            to: "/",
            child: null,
            groupIndex: 5,
        },
        {
            id: 10,
            icon: <LogoutIcon />,
            title: "Log out",
            to: "/",
            child: null,
            groupIndex: 5,
            onClick: () => {
                dispatch(logoutAsync());
                window.location.href = "/login";
            },
            onClickDispatch: () => logout(),
            callback: (func) => {
                func(configRoutes.login);
            },
        },
    ];
};

const MessageItemMenu = (data) => {
    const dispatch = useDispatch();
    return [
        {
            id: 1,
            icon: <CheckIcon />,
            title: "Mark as read",
            to: "/",
            child: null,
            groupIndex: 1,
        },
        {
            id: 2,
            icon: <NotificationsIcon />,
            title: "Mute notifications",
            to: "/",
            child: null,
            groupIndex: 1,
        },
        {
            id: 3,
            icon: <PersonIcon />,
            title: "View profile",
            to: "/",
            child: null,
            groupIndex: 1,
        },
        {
            id: 4,
            icon: <LockIcon />,
            title: "Start end-to-end encrypted chat",
            to: "/",
            child: null,
            groupIndex: 2,
        },
        {
            id: 5,
            icon: <CallIcon />,
            title: "Audio call",
            to: "/",
            child: null,
            groupIndex: 3,
        },
        {
            id: 6,
            icon: <VideocamIcon />,
            title: "Video chat",
            to: "/",
            child: null,
            groupIndex: 3,
        },
        {
            id: 7,
            icon: <ArchivedChatsIcon />,
            title: "Archive chat",
            to: "/",
            child: null,
            groupIndex: 4,
        },
        {
            id: 8,
            icon: <DeleteIcon />,
            title: "Delete chat",
            to: "/",
            child: null,
            groupIndex: 4,
            // onClick: () => dispatch(removeGroup(data)),//TODO
            // onClickDispatch: () => removeGroup(data),
        },
        {
            id: 9,
            icon: <ReportProblemIcon />,
            title: "Report",
            to: "/",
            child: null,
            groupIndex: 4,
        },
    ];
};
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
