import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from './Index.module.css';



interface Ticket {
    name: string;
    email: string;
    description: string;
}


export default function Home() {
    const [name, setName]= useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()


        const response = await fetch('/api/submitTicket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, description })
        })

        const result = await response.json();
        if(response.ok){
            setMessage('Ticket submitted successfully!')
            setName('')
            setEmail('')
            setDescription('')
        } else {
            setMessage(result.message || 'Something went wrong')
        }
    
        
    }

    return (
        <div  className={styles.formContainer}>
            <h1>Help Desk</h1>
            <form onSubmit={handleSubmit} className={styles.inputField}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"/>
                <button type="submit" className={styles.submitButton}>Submit Ticket</button>
            </form>
            <div className ={styles.linkk}>
                <Link href={"/admin"}>Click for admin only</Link>
            </div>
            <div className={styles.message}>
                {message && <p>{message}</p>}
            </div>
        </div>
    )
}