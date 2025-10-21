async function getCategoriesController(req, res) {
  //get all categories based on user id
}
async function getCategoryController(req, res) {
  //get selected category by id
}

async function createCategoryController(req, res) {
  //create category with user id
}

async function deleteCategoryController(req, res) {
  //delete category with user id and cat id
}

async function updateCategoryController(req, res) {
  //update category with user id and cat id
}

module.exports = {
  getCategoriesController,
  createCategoryController,
  deleteCategoryController,
  updateCategoryController,
  getCategoryController,
};
