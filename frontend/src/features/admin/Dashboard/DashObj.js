import { AiOutlineBarChart,AiOutlineHome } from "react-icons/ai"
import { FaBoxes, FaRegUser, } from 'react-icons/fa'
import { HiOutlineClipboardList } from "react-icons/hi"
import Navigations from "../../../components/Navigations"

export const DashObj = [
    {
        id: 0,
        icon: AiOutlineHome,
        name: "Home",
        link: '/'
    },
    {
        id: 1,
        icon: AiOutlineBarChart,
        name: "overview",
        link: '/dashboard'
    },
    {
        id: 2,
        icon: FaRegUser,
        name: "Users",
        link: '/dashboard/user'
    },
    {
        id: 3,
        icon: FaBoxes,
        name: "Products",
        link: Navigations.dashProductList
    },
    {
        id: 4,
        icon: HiOutlineClipboardList,
        name: "Categories",
        link: '/dashboard/store/category'
    },
    {
        id: 5,
        icon: HiOutlineClipboardList,
        name: "Orders",
        link: '/dashboard/orders'
    }
]
