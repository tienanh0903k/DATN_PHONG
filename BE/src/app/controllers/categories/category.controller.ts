import { Request, Response } from "express";
import { CategoryServices } from "../../services/CategoryServices";
import { ICategory } from "../../services/interfaces/ICategories";

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const dataCategories = await CategoryServices.getAllCategories();
    res.status(200).json(dataCategories);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createCategory = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newCategory = await CategoryServices.createCategory(data);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateCategory = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const updatedCategory = await CategoryServices.updateCategory(data);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteCategory = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    await CategoryServices.deleteCategory(data);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const unusedCategories = async (req: Request, res: Response) => {
  try {
    const unusedCategories = await CategoryServices.unusedCategories();
    res.status(200).json(unusedCategories);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  unusedCategories,
};
