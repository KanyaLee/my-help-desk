import { supabase } from '../../../supabaseClient'

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, status } = req.body

    const { data, error } = await supabase
      .from('tickets')
      .update({ status })
      .eq('id', id)

    if (error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(200).json(data)
    }
  } else {
    res.status(405).send('Method Not Allowed')
  }
}
