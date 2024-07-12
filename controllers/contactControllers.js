//@desc Get all Contacts
//@route Get /api/contacts
//@access public
const getContacts = (req, res) => {
    res.status(200).json({ message: "Get all contacts" });
}
//@desc Get Contact
//@route Get /api/contact/:id
//@access public
const getContact = (req, res) => {
    res.status(200).json({ message: `Get contact for ${req.params.id}` });
}
//@desc Update Contact
//@route Put /api/contacts/:id
//@access public
const updateContact = (req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` });
}
//@desc Create Contact
//@route Post /api/contacts
//@access public
const createContact = (req, res) => {
    console.log(req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandantory!!");
    }
    res.status(201).json({ message: "Create contact" });
}
//@desc Delete Contact
//@route Post /api/contacts/:id
//@access public
const deleteContact = (req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}` });
}




module.exports = { getContacts, getContact, createContact, deleteContact, updateContact };