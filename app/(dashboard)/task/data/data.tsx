import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons";

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
        icon: QuestionMarkCircledIcon,
    },
    {
        value: "confirmed",
        label: "Confirmed",
        icon: CircleIcon,
    },
    {
        value: "in progress",
        label: "In Progress",
        icon: StopwatchIcon,
    },
    {
        value: "completed",
        label: "Completed",
        icon: CheckCircledIcon,
    },
    {
        value: "canceled",
        label: "Canceled",
        icon: CrossCircledIcon,
    },
];

export const priorities = [
    {
        label: "GHTK",
        value: "GHTK",
        icon: ArrowDownIcon,
    },
    {
        label: "GHN",
        value: "GHN",
        icon: ArrowRightIcon,
    },
    {
        label: "GHHT",
        value: "GHHT",
        icon: ArrowUpIcon,
    },
];

// export const employees = [
//   {
//     label: "employee",
//     value: "Employee",
//     icon: ArrowDownIcon,
//   },
// ]
