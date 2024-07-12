const express = require('express');
const Contact = require("../models/contactModel");

//@desc Get all Contacts
//@route Get /api/contacts
//@access public
const getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (err) {
        next(err);
    }
}
//@desc Get Contact
//@route Get /api/contact/:id
//@access public
const getContact = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404);
            throw new Error("Contact not Found");
        }
        res.status(200).json(contact);
    }
    catch (err) {
        next(err);
    }
}
//@desc Update Contact
//@route Put /api/contacts/:id
//@access public
const updateContact = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404);
            throw new Error("Contact not Found");
        }
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedContact);

    }
    catch (err) {
        next(err);
    }

}
//@desc Create Contact
//@route Post /api/contacts
//@access public
const createContact = async (req, res, next) => {

    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            res.status(400);
            throw new Error("All fields are mandantory!!");
        }
        const contact = await Contact.create({
            name,
            email,
            phone,
        });
        res.status(201).json(contact);
    } catch (err) {
        // console.log(err);
        next(err);
    }
}
//@desc Delete Contact
//@route Post /api/contacts/:id
//@access public
const deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404);
            throw new Error("Contact not Found");
        }
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json(contact);
    }
    catch (err) {
        next(err);
    }
}




module.exports = { getContacts, getContact, createContact, deleteContact, updateContact };