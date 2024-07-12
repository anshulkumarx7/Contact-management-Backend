const express=require("express");
const router=express.Router();

const {getContacts, getContact, createContact, deleteContact, updateContact } =require("../controllers/contactControllers")

router.route("/").get(getContacts).post(createContact)
router.route("/:id").put(updateContact).get(getContact).delete(deleteContact)

module.exports=router;