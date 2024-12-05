import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

export const AuthContext = createContext({});

function AuthProvaider({children}){
    const [data, setData] = useState({});

    async function signIn({email, password}) {
        try{
            const response = await api.post('auth', {email, password});
            const { user, token} = response.data;
            localStorage.setItem("@ProjetoArmazem:user", JSON.stringify(user));
            localStorage.setItem("@ProjetoArmazem:token", token);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({user,token})
            

        }catch (error){
            if(error.response){
                alert(error.response.data.message)
            }else{
                alert(error)
            }
        }


    }

    function signOut(){
        localStorage.removeItem("@ProjetoArmazem:token")
        localStorage.removeItem("@ProjetoArmazem:user")

        setData({});
       
    }

    async function updateProfile({user, avatarFile}){
        try{
            if(avatarFile){
                const fileUploadForm = new FormData();
                fileUploadForm.append("avatar", avatarFile);

                const response = await api.patch('users/avatar', fileUploadForm);
                user.avatar = response.data.avatar;
            }

            await api.put("/users", user);
            localStorage.setItem("@OpeLucio:user", JSON.stringify(user));
            setData({ user, token: data.token })
            alert("Perfil Atualizado")

        }catch (error){
            if(error.response){
                alert(error.response.data.message)
            }else{
                alert('Não foi possivel alterar o perfil.')
                console.log(error)
            }
        }
    }

    useEffect(()=>{
        const token =  localStorage.getItem("@ProjetoArmazem:token")
        const user =  localStorage.getItem("@ProjetoArmazem:user")

        if(token && user){
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({
                token,
                user: JSON.parse(user)
            })

        }
    },[])

    return(
        <AuthContext.Provider value = {{
                signIn,
                signOut,
                updateProfile,
                user: data.user,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);

    return context
}
export { AuthProvaider, useAuth};