import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import styles from './Admin.module.css'
import Link from 'next/link';

interface Ticket {
    id: number;
    name: string;
    email: string;
    description: string;
    status: string;

}

export default function Admin() {
    const [tickets,setTickets] = useState<Ticket[]>([])


    const fetchTicket = async () => {
        const {data,error} = await supabase
        .from('tickets')
        .select('*')

        if(error){
            console.log('Error fetching tickets', error)
        } else {
            setTickets(data);
        }
    }

    useEffect(() => {
        fetchTicket()
    }, [])

    const updateTicketStatus = async (id: number, status: string) => {
        await fetch('/api/updateTicket', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, status }),
        })
        fetchTicket()
      }

      const getButtonClass = (ticketStatus: string, buttonStatus: string) => {
        if (ticketStatus === buttonStatus) {
          return buttonStatus === 'in progress' ? styles.buttonInProgress : styles.buttonResolved;
        }
        return styles.button; // Default button style
      };
    

    return (
        <div className={styles.adminContainer}>
            <h1>Admin Panel</h1>
            <table className={styles.table}>
                <thead className={styles.tableHead}>
                    <tr>
                        <th className={styles.th}>ID</th>
                        <th className={styles.th}>Name</th>
                        <th className={styles.th}>Email</th>
                        <th className={styles.th}>Description</th>
                        <th className={styles.th}>Status</th>
                        <th className={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key = {ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.name}</td>
                            <td>{ticket.email}</td>
                            <td>{ticket.description}</td>
                            <td>{ticket.status}</td>
                            <td>
                                <button 
                                className={getButtonClass(ticket.status, 'in progress')}
                                onClick={()=> updateTicketStatus(ticket.id, 'in progress')}>In Progress
                                </button>


                                <button 
                                className={getButtonClass(ticket.status, 'resolved')}
                                onClick={()=> updateTicketStatus(ticket.id, 'resolved')}>Resolved
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                <Link href={'/'}>Back to Submission Page</Link>
        </div>
    )
}