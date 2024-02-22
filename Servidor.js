
const Dtbase = require("./Banco/DBanco")
const Cadastrotb = require("./Banco/Cadastrotb")
const express = require("express")
const app = express()
const path = require("path")
const Porta = 3000




/*SERVIDOR/BANCO*/

Dtbase.sync()
    .then (() => {
    app.listen(Porta, () => { console.log(`Servidor funcionando na porta: ${Porta}`)})
})
    .catch(e => console.log (`Alerta! ${e}`) )

    


//HTML
app.use(express.static(path.join(__dirname, "Publica")));




/* API */
app.use(express.json())

//POST(ENVIAR)
app.post("/Cadastrotb", (req, res) => {
    Cadastrotb.create(req.body) 
    .then((Cadastro) => res.status(201).json(Cadastro))
    .catch((error) => res.status(400).json({error: error.message}))
})

//GET(BUSCAR)
app.get ("/Cadastrotb", (req, res) => {
    Cadastrotb.findAll(req.body)
        .then(Cadastro => res.status(200).json(Cadastro))
        .catch((error) => res.status(400).json({error: error.message}))
})

//PUT(ATUALIZAR) 
app.put("/Cadastrotb/:id", (req, res) => {
    const { id } = req.params;
    Cadastrotb.update(req.body, {
      where: { id: id },
    })
      .then((rowsUpdated) => {
        if (rowsUpdated > 0) {
          res.status(200).json({ message: "Produto atualizado com sucesso!" });
        } else {
          res.status(404).json({ message: "Produto não encontrado" });
        }
      })
      .catch((err) => res.status(400).json({ error: err.message }));
  });

//DELETE(DELETAR)
app.delete("/Cadastrotb/:id", (req, res) => {
    const { id } = req.params;
    Cadastrotb.destroy({
      where: { id: id },
    })
      .then(() =>
        res.status(201).json({ mensagem: "Produto deletado com sucesso!" })
      )
      .catch((err) => res.status(400).json({ error: err.message }));
  });