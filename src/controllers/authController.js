const User = require('../models/User');

const authController = {
  showLogin: (req, res) => {
    if (req.session.user) {
      return res.redirect('/dashboard');
    }
    res.render('login', { error: null });
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await User.findByUsername(username);
      if (!user) {
        return res.render('login', { error: 'Usuario no encontrado' });
      }
      
      const isValidPassword = await User.validatePassword(password, user.password);
      if (!isValidPassword) {
        return res.render('login', { error: 'Contraseña incorrecta' });
      }
      
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email
      };
      
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error en login:', error);
      res.render('login', { error: 'Error interno del servidor' });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar sesión:', err);
      }
      res.redirect('/auth/login');
    });
  }
};

module.exports = authController;
