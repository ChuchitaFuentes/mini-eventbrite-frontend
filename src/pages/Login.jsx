import { useState } from "react";
import { useLocation, useNavigate,  Link } from "react-router-dom";
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import useAuth from "../hooks/useAuth.js"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from.pathname || '/events'


    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); setError(null)
        try {
            await login({ email, password });
            navigate(from, { replace: true })
        } catch (err) {
            setError(err?.message || 'No se pudo iniciar sesión')
        }
        finally { setLoading(false) }
    }
    return (
        <div className="mas-w-md mx-auto">
            <Card>
                <h1 className="text-2xl font-semibold mb-2"> Bienvenido a {import.meta.env.VITE_APP_NAME || 'La plataforma'}</h1>
                <p className="opacity-80 mb-6">Tu sesión permanecerá activa tras recargar.</p>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="label">Correo</label>
                        <input type="email" className="input" value={email} onChange={(e => setEmail.target.value)} required />
                    </div>
                    <div>
                        <label className="label">Contraseña</label>
                        <input type="password" className="input" value={password} onChange={(e => setPassword.target.value)} required />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button disable={loading}>{loading ? 'Ingresando...' : 'Entrar'}</Button>
                </form>
                <p className="text-sm mt-4">
                    ¿No tienes una cuenta? <Link to="register" className="underline">Regístrate</Link>
                </p>
            </Card>
        </div>
    )
}