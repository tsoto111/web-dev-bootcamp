function set_recipe(req, res, next) {
  const choice = req.body['choice']
  const recipeData = res.locals.recipeData
  if (!choice || !recipeData) {
    next()
  }

  const targetRecipe = recipeData.filter(recipe => recipe.name.toLowerCase().includes(choice))
  if (targetRecipe) {
    res.locals.recipe = targetRecipe[0]
  }
  
  next()
}

export default set_recipe