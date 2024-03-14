const bcrypt = require('bcrypt')
const CustomersModel = require('../models/customers')

const defaultTitle = 'Acesso Restrito'


function index(req, res) {
  return res.render('login', {
    title: defaultTitle,
  })
}

async function login(req, res) {
  const {
    email,
    password,
  } = req.body

  let message
  const user = await CustomersModel.findOne({ email })

  if (user) {
    const isValid = await bcrypt.compare(password, user.password)

    if (isValid) {
      res.send('ok, logado!')
    } else {
      message = 'Usuário ou senha inválidos!'
    }
  } else {
    message = 'Usuário não existe!'
  }

  res.render('login', {
    title: defaultTitle,
    message,
  })
}

module.exports = {
  index,
  login,
}