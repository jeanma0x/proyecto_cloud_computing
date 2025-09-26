const User = require('../models/User');

const userController = {
  list: async (req, res) => {
    try {
      const users = await User.findAll();
      res.render('users', { 
        users, 
        user: req.session.user, 
        success: req.query.success,
        error: req.query.error 
      });
    } catch (error) {
      console.error('Error al listar usuarios:', error);
      res.render('users', { 
        users: [], 
        user: req.session.user, 
        error: 'Error al cargar usuarios' 
      });
    }
  },

  create: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
      if (!username || !email || !password) {
        return res.redirect('/users?error=Todos los campos son requeridos');
      }
      
      await User.create({ username, email, password });
      res.redirect('/users?success=Usuario creado exitosamente');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        res.redirect('/users?error=El usuario o email ya existe');
      } else {
        res.redirect('/users?error=Error al crear usuario');
      }
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;
      
      if (!username || !email) {
        return res.redirect('/users?error=Username y email son requeridos');
      }
      
      await User.update(id, { username, email, password });
      res.redirect('/users?success=Usuario actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.redirect('/users?error=Error al actualizar usuario');
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (parseInt(id) === req.session.user.id) {
        return res.redirect('/users?error=No puedes eliminar tu propio usuario');
      }
      
      await User.delete(id);
      res.redirect('/users?success=Usuario eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.redirect('/users?error=Error al eliminar usuario');
    }
  }
};

module.exports = userController;