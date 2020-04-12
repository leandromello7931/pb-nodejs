const connection = require('../database/connection');

const storeAnItem = async (req, trx) =>{
  const { name, description, price, active} = req.body;
  const imageUpload = req.file.path;
  try{
    [item] = await trx('items')
      .returning('id')
      .insert({name, description, price, image : imageUpload, active});
      return item;
  }catch(err){
    console.log(err);
  }
}

const storeCategoryXItem = async (id_category, id_item, trx) => {
  try{
    [categoryxitem] = await trx('categoriesxitems')
    .returning('id')
    .insert({id_category: id_category, id_item: id_item})
    return categoryxitem;
  }catch(err){
    console.log(err);
  }
};

module.exports = {

  async index(req, res){
    try{
      const items = await connection('items').select('*');
      return res.status(200).send(items);
    }catch(err){
      return res.status(500).send({error: "Algo deu errado. Tente novamente."})
    }
  },

  async itemsWithCategory(req, res){
    const { id } = req.params;
    try{
      const items = await connection('categoriesxitems')
      .join('categories', 'categories.id', 'categoriesxitems.id_category')
      .join('items', 'items.id', 'categoriesxitems.id_item')
      .where('categoriesxitems.id_category', '=', id)
      .select('categories.id as id_category', 'items.id as item_id', 'items.name as item_name', 'items.image as item_image', 'items.price', 'items.created_at', 'items.updated_at');
      
      return res.status(200).send({items});
    }catch(err){
      console.log(err);
      return res.status(500).send({error: "Algo deu errado. Tente novamente"});
    }
  },

  async store(req, res){
    try{
      const trx = await connection.transaction();
      const item = await storeAnItem(req, trx);

      if (!item ){
        return res.status(409).send({ error: "Não foi possível criar o item, tente novamente." });
      }else{
        trx.commit();
        return res.status(200).send( {item} );
      }
    }catch(err){
      console.log(err);
      return res.status(500).send({ error: "Algo deu errado. Tente novamente."});
    }
  },

  async storeWithinCategory(req, res){
    try{
      const trx = await connection.transaction();
      const { id } = req.params;

      categoryxitem = await storeAnItem(req, trx)
      .then(async item => { 
        return await storeCategoryXItem(id, item, trx)} )
      .catch(trx.rollback);
      if (!categoryxitem ){
        return res.status(409).send({ error: "Não foi possível criar o item, tente novamente." });
      }else{
        trx.commit();
        return res.status(200).send({ categoryxitem });
      }
    }catch(err){
      console.log(err);
      return res.status(500).send({ error: "Algo deu errado. Tente novamente."});
    }
  },

  async update(req, res){
    try{
      const item_id  = req.params.id; 
      const { name, description, price } = req.body;
      const imageUpload = req.file.path;
  
      const [item] = await connection('items')
      .where({id: item_id})
      .update({
          name: name,
          description: description,
          price: price,
          active: true,
          image: imageUpload,
          updated_at: new Date()
        }, ['id']);

        if(!item){
          return res.status(409).send({error: "Não foi possível atualizar o item, tente novamente."});
        }else{
          return res.status(200).send(item);
        }
    }catch(err){
      console.log(err);
      return res.status(500).send({error: "Algo deu errado. Tente novamente."})
    }
  },
  
  async delete(req, res){
    try{  
      const { id } = req.params;
      const rowsDeleted = await connection('items')
      .where({
          id: id
      }).del();
      if(rowsDeleted !== 0){
        return res.status(200).send({message: "Registro deletado com sucesso."});
    }else{
      return res.status(409).send({error: "Não foi possível excluir o item, tente novamente."});
      }
    }catch(err){
      console.log(err);
      return res.status(500).send({error: "Algo deu errado. Tente novamente."});
    }
  },

  async associateItemWithCategory(req, res){
    try{
      const trx = await connection.transaction();
      const { id } = req.params;
      const item_id = req.body.id;
      categoryxitem = await storeCategoryXItem(id, item_id, trx)
      if (!categoryxitem ){
        return res.status(409).send({ error: "Não foi possível criar o item, tente novamente." });
      }else{
        trx.commit();
        return res.status(200).send({ categoryxitem });
      }
    }catch(err){
      console.log(err);
      return res.status(500).send({ error: "Algo deu errado. Tente novamente."});
    }
  },

  async disassociateAnItemFromACategory(req, res){
    try{
      const id_category = req.params.id;
      const id_item = req.body.id;

      const rowsDeleted = await connection('categoriesxitems')
      .where({
        id_category: id_category,
        id_item: id_item
      }).del();
      if(rowsDeleted !== 0){
        return res.status(200).send({message: "Registro desassociado com sucesso."});
      }else{
        return res.status(409).send({error: "Não foi possível desassociar o item, tente novamente."});
      }
    }catch(err){
      console.log(err);
      return res.status(500).send({ error: "Algo deu errado. Tente novamente." });
    }
  }
}