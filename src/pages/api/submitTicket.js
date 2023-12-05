import { supabase } from '../../../supabaseClient'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, description } = req.body
    const { data, error } = await supabase
      .from('tickets')
      .insert([{ name, email, description, status: 'new' }])

    if (error) {
      return res.status(500).json({ message: 'Error submitting ticket', error })
    } else {
      return res.status(200).json({ message: 'Ticket submitted successfully', data })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}