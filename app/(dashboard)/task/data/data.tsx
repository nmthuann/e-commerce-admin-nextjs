import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    LapTimerIcon,
    QuestionMarkCircledIcon,
    ResetIcon,
    RocketIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons";
import {
    ArchiveIcon,
    ArrowBigDown,
    ArrowLeftRight,
    CheckCircleIcon,
    ChevronDown,
    ChevronsDown,
    FastForward,
    PackageCheck,
    Undo2,
    XCircle,
} from "lucide-react";

export const labels = [
    {
        value: "offline",
        label: "Offline",
    },
    {
        value: "online",
        label: "Online",
    },
    // {
    //   value: "documentation",
    //   label: "Documentation",
    // },
];

export const statuses = [
    {
        value: "pending",
        label: "Pending",
        icon: LapTimerIcon,
    },
    {
        value: "confirmed",
        label: "Confirmed",
        icon: PackageCheck,
    },
    {
        value: "in progress",
        label: "In Progress",
        icon: RocketIcon,
    },
    {
        value: "completed",
        label: "Completed",
        icon: CheckCircleIcon,
    },
    {
        value: "canceled",
        label: "Canceled",
        icon: XCircle,
    },
    {
        value: "refunded",
        label: "Refunded",
        icon: Undo2,
    },
];

export const priorities = [
    {
        label: "GHTK",
        value: "GHTK",
        icon: ChevronsDown,
    },
    {
        label: "GHN",
        value: "GHN",
        icon: ArrowLeftRight,
    },
    {
        label: "GHHT",
        value: "GHHT",
        icon: FastForward,
    },
];

// export const employees = [
//   {
//     label: "employee",
//     value: "Employee",
//     icon: ArrowDownIcon,
//   },
// ]
