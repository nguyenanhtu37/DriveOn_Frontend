import axios from 'axios';

const handleSuccess = async (credentialResponse) => {
    try {
        // gui token ve backend de xac thuc
        const result = await axios.post(`${import.meta.env.VITE_BE_API}/auth/google`, {
            token: credentialResponse.credential
        })

        // xu ly phan hoi tu backkend
        console.log("result.data: ", JSON.stringify(result.data));
        console.log("result: ", result);

        if (result.status === 200 && result.statusText === "OK") {
            alert("Login successfull!");
            // team FE xu ly phan nay
            // dieu huong den trang nao sau khi login thanh cong
        } else {
            alert(result.data.message || "Login failed");
        }
    } catch (error) {
        const data = error?.response?.data;
        alert(data?.message || "Login failed");
    }
};

export default handleSuccess;