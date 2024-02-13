import mongoose from 'mongoose';
import { randomUUID } from "node:crypto";
import { hashear } from "../utils/cripto.js";
//import { responseFailed } from '../middlewares/responseFailed.js';
//import { responseSuccessfull } from '../middlewares/responseSuccessfull.js';
const { Schema, model } = mongoose;

const collection = 'usuarios';

const userSchema = new Schema({
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true }
}, {
    strict: 'throw',
    versionKey: false,
    methods: {
        infoPublica: function () {
            return {
                email: this.email,
                nombre: this.nombre,
                apellido: this.apellido,
            };
        }
    },
    statics: {
        registrar: async function (reqBody, res) {
            try {
                reqBody.password = hashear(reqBody.password);
                const creado = await this.create(reqBody);

                const datosUsuario = {
                    email: creado.email,
                    nombre: creado.nombre,
                    apellido: creado.apellido,
                    rol: 'usuario'
                };

                return res.successfullPost(datosUsuario);
            } catch (error) {
                return res.failedPost(error.message);
            }
        },
        buscarSession: function (req, res) {
            if (req.session['user']) {
                return res.json(req.session['user']);
            }
            res.failedGet();
        },
        buscarUsuario: async function (req, res) {
            const user = req.session['user'];

            if (user) {
                try {
                    const usuario = await this.findOne({ email: user.email }, { password: 0 }).lean();
                    return res.successfullGet(usuario);
                } catch (error) {
                    return res.failedGet();
                }
            } else {
                res.failedGet();
            }
        },
        resetearContrasenia: async function (email, password) {
            try {
                const newPassword = hashear(password);

                const actualizado = await this.findOneAndUpdate(
                    { email },
                    { $set: { password: newPassword } },
                    { new: true }
                ).lean();

                if (!actualizado) {
                    throw new Error('usuario no encontrado');
                }

                return actualizado;
            } catch (error) {
                throw new Error('Error al restablecer la contraseña del usuario');
            }
        },
        deleteSession: function (req, res) {
            req.session.destroy(err => {
                if (err) {
                    return res.failedDeleteSession();
                }
                res.successfullLogout();
            });
        }
    }
});

export const User = model(collection, userSchema);


/*
import mongoose from 'mongoose';
import { randomUUID } from "node:crypto";
import { hashear } from "../utils/cripto.js";
//import { responseFailed } from '../middlewares/responseFailed.js';
//import { responseSuccessfull } from '../middlewares/responseSuccessfull.js';

const { Schema, model } = mongoose;

const collection = 'usuarios';

const userSchema = new Schema({
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true }
}, {
    strict: 'throw',
    versionKey: false,
    methods: {
        infoPublica: function () {
            return {
                email: this.email,
                nombre: this.nombre,
                apellido: this.apellido,
            };
        }
    },
    statics: {
        registrar: async function (reqBody) {
            reqBody.password = hashear(reqBody.password);
            const creado = await mongoose.model(collection).create(reqBody);

            const datosUsuario = {
                email: creado.email,
                nombre: creado.nombre,
                apellido: creado.apellido,
                rol: 'usuario'
            };

            return res.successfullPost(datosUsuario);
        },
        buscarSession: function (req, res) {
            if (req.session['user']) {
                return res.json(req.session['user']);
            }
            res.failedGet();
        },
        buscarUsuario: async function (req, res) {
            const user = req.session['user'];

            if (user) {
                const usuario = await mongoose.model('usuarios').findOne({ email: user.email }, { password: 0 }).lean();
                res.json({ status: 'success', payload: usuario });
            } else {
                res.failedGet();
            }
        },
        resetearContrasenia: async function (email, password) {
            const newPassword = hashear(password);

            const actualizado = await mongoose.model(collection).findOneAndUpdate(
                { email },
                { $set: { password: newPassword } },
                { new: true }
            ).lean();

            if (!actualizado) {
                throw new Error('usuario no encontrado');
            }

            return actualizado;
        },
        //logout
        deleteSession: function (req, res) {
            req.session.destroy(err => {
                if (err) {
                    return res.failedDeleteSession();
                }
                res.successfullLogout();
            });
        }
    }
});

export const User = model('usuarios', userSchema);
*/



/*import { Schema, model } from 'mongoose';
import { randomUUID } from "node:crypto";
import { hashear, hasheadasSonIguales } from "../utils/cripto.js";
import { responseFailed } from '../middlewares/responseFailed.js'
import { responseSuccessfull } from '../middlewares/responseSuccessfull.js';

const collection = 'usuarios';
const userSchema = new Schema({
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
},{
  strict: 'throw',
  versionKey: false,
  methods: {
    infoPublica: function () {
      return {
        email: this.email,
        nombre: this.nombre,
        apellido: this.apellido,
      };
    }
  },
  statics: {
    registrar: async function (reqBody) {
      reqBody.password = hashear(reqBody.password);
      const creado = await this.create(reqBody);

      const datosUsuario = {
        email: creado.email,
        nombre: creado.nombre,
        apellido: creado.apellido,
        rol: 'usuario'
      };

      return responseSuccessfull.successfullPost(datosUsuario);
    },
    buscarSession: function (req, res) {
      if (req.session['user']) {
        return res.json(req.session['user']);
      }
      responseFailed.failedGet();
    },
    buscarUsuario: async function (req, res) {
      const user = req.session['user'];
      
      if (user) {
        const usuario = await this.findOne({ email: user.email }, { password: 0 }).lean();
        res.json({ status: 'success', payload: usuario });
      } else {
        responseFailed.failedGet();
      }
    },
    resetearContrasenia: async function (email, password) {
      const newPassword = hashear(password);

      const actualizado = await this.findOneAndUpdate(
        { email },
        { $set: { password: newPassword } },
        { new: true }
      ).lean();

      if (!actualizado) {
        throw new Error('usuario no encontrado');
      }

      return actualizado;
    },
    //logout
    deleteSession: function (req, res) {
      req.session.destroy(err => {
        if (err) {
          return responseFailed.failedDeleteSession();
        }
        responseSuccessfull.successfullLogout();
      });
    }
  }
});

export default model('User', userSchema);
*/





/*
import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import { randomUUID } from "node:crypto"
import { hashear } from "../utils/cripto.js"
import { responseFailed } from '../middlewares/responseFailed.js'
import { responseSuccessfull } from '../middlewares/responseSuccessfull.js';

const collection = 'usuarios'
const userSchema = new Schema({
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
},{
  strict: 'throw',
  versionKey: false,
  methods: {
    infoPublica: function () {
      return {
        email: this.email,
        nombre: this.nombre,
        apellido: this.apellido,
      }
    }
  },
  statics: {
    registrar: async function (reqBody) {
      reqBody.password = hashear(reqBody.password)
      const creado = await model(collection).create(reqBody)

      const datosUsuario = {
        email: creado.email,
        nombre: creado.nombre,
        apellido: creado.apellido,
        rol: 'usuario'
      }

      return responseSuccessfull.successfullPost(datosUsuario)
    },
    buscarSession: function (req, res) {
      if (req.session['user']) {
        return res.json(req.session['user'])
      }
      responseFailed.failedGet()
    },
    buscarUsuario: async function (req, res) {
      const user = req.session['user'];
      
      if (user) {
        const usuario = await User.findOne({ email: user.email }, { password: 0 }).lean();
        res.json({ status: 'success', payload: usuario });
      } else {
        responseFailed.failedGet();
      }
    },
    resetearContrasenia: async function (email, password) {
      const newPassword = hashear(password)

      const actualizado = await model(collection).findOneAndUpdate(
        { email },
        { $set: { password: newPassword } },
        { new: true }
      ).lean()

      if (!actualizado) {
        throw new Error('usuario no encontrado')
      }

      return actualizado
    },
    //logout
    deleteSession: function (req, res) {
      req.session.destroy(err => {
        if (err) {
          return responseFailed.failedDeleteSession()
        }
        responseSuccessfull.successfullLogout()
        })
    }
  }
})

export const User = mongoose.model('usuarios', userSchema)

*/