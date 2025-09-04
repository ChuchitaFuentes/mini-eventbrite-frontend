import { useState } from "react";
import { useLocation, useNavigate,  Link } from "react-router-dom";
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import useAuth from "../hooks/useAuth.js"

export default function Register() {
    const [form, setForm] = useState('')
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')
    const { register } = useAuth(null)
    const navigate = useNavigate()

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.taget.value })

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); setError(null)
        try {
            await register(form);
            navigate('/events', { replace: true })
        } catch (err) {
            setError(err?.message || 'No se pudo iniciar sesión')
        }
        finally { setLoading(false) }
    }
    return (
        <div className="mas-w-md mx-auto">
            <Card>
                <h1 className="text-2xl font-semibold mb-2">Crea tu cuenta</h1>
                <p className="opacity-80 mb-6">Regístrate para organizr o comprar entradas.</p>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="label">Nombre</label>
                        <input type="text" className="input" value={form.name} onChange={onChange} required />
                    </div>
                    <div>
                        <label className="label">Correo electrónico</label>
                        <input type="email" className="input" value={form.email} onChange={onChange} required />
                    </div>
                    <div>
                        <label className="label">Contraseña</label>
                        <input type="password" className="input" value={form.password} onChange={onChange} required />
                    </div>
                    <div>
                        <label className="label">Rol</label>
                        <select className="input" name="role" value={form.role} onChange={onChange}>
                            <option value="user">user</option>
                            <option value="organizer">organizer</option>
                            <option value="staff">staff</option>
                            <option value="admin">admin</option>
                        </select>
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