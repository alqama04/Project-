import useToastMsg from "../../hooks/useToastMsg";
import { useSendLogoutMutation } from "./authApiSlice";

const Logout = () => {
    const { handleToast } = useToastMsg()

    const [sendLogout, { isLoading }] = useSendLogoutMutation()

    const handeLogout = async () => {
        try {
            await sendLogout()
            handleToast({ desc: "Logout successfully", status: "success" })
        } catch (error) {
            handleToast({ desc: error.data.message, status: "error" })
        }
    }
    return { handeLogout ,isLoading}
}

export default Logout;
