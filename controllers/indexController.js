
const index = async (req, res) => {
  if(req.user) {
    res.redirect('/tasks')
  }

  res.status(200).json({
    message: 'good'
  })
}

const auth = async (req, res) => {

}

export default {
  index
}