const ProyectoModel = require('./model/proyectoModel')
const UsuarioModel = require('./model/usuariosModel')
let aes256 = require('aes256');
const key = 'CLAVEDIFICIL';

const resolvers = {
    Query: {
        proyectos: async () => await ProyectoModel.find({}),
        getProyecto: async (parent, args, context, info) => await ProyectoModel.findOne({ name: args.name }),
        usuarios: async () => await UsuarioModel.find({}),
        getUsuario: async (parent, args, context, info) => await UsuarioModel.findOne({ identification: args.identification })
    },
    Mutation: {
        //crear proyecto nuevo
        createProyecto: (parent, args, context, info) => {
            const { name, generalObjective, specificObjectives, budget, startDate, endDate } = args.Proyecto;
            const nuevoProyecto = new ProyectoModel();
            nuevoProyecto.name = name;
            nuevoProyecto.generalObjective = generalObjective;
            nuevoProyecto.specificObjectives = specificObjectives;
            nuevoProyecto.budget = budget;
            if (startDate) { nuevoProyecto.startDate = startDate; } else { nuevoProyecto.startDate = new Date(); }
            nuevoProyecto.endDate = endDate;
            return nuevoProyecto.save().then(u => "Proyecto creado")
                .catch(err => console.log("Fallo la Creación"));
            //.catch(err => console.log("err")) si quierover cual es el error
        },
        //actualizar un campo de proyectos
        activeProyecto: (parent, args, context, info) => {
            return ProyectoModel.updateOne({ name: args.name }, { status: "ACTIVE" })
                .then(u => "Proyecto Actualizado")
                .catch(err => console.log("Fallo la Activación"));
        },
        //borrar un proyecto
        deleteProyecto: (parent, args, context, info) => {
            return ProyectoModel.deleteOne({ name: args.name1 })
                .then(u => "Proyecto Eliminado")
                .catch(err => console.log("Fallo La Eliminación"));
        },
        // Crear usuario
        createUsuario: (parent, args, context, info) => {
            const { fullName, identification, email, password, role, status } = args.Usuario;
            const encryptedPlainText = aes256.encrypt(key, password);
            const nuevoUsuario = new UsuarioModel();
            nuevoUsuario.fullName = fullName;
            nuevoUsuario.identification = identification;
            nuevoUsuario.email = email;
            nuevoUsuario.password = encryptedPlainText;
            nuevoUsuario.role = role;
            nuevoUsuario.status = status;
            return nuevoUsuario.save()
                .then(mensaje => "Usuario creado")
                .catch(err => console.log("Falló la creación"));
        },
        // Actualizar status usuario
        updateStatusUsuario: (parent, args, context, info) => {
            return UsuarioModel.updateOne({ identification: args.identification }, { status: args.status })
                .then(u => "Status de usuario actualizado")
                .catch(err => console.log("Falló la actualización"));
        },
        updateUsuario: (parent, args, context, info) => {
            return UsuarioModel.updateOne({ _id: args._id },
                {
                    fullName: args.fullName,
                    identification: args.identification,
                    email: args.email,
                    password: args.password,
                    role: args.role,
                    status: args.status
                })
                .then(u => "Usuario actualizado")
                .catch(err => console.log(err));
        },
        deleteUsuario: (parent, args, context, info) => {
            return UsuarioModel.deleteOne({ identification: args.identification })
                .then(u => "Usuario eliminado")
                .catch(err => console.log("Falló la eliminación"));
        }
    }
}
module.exports = resolvers