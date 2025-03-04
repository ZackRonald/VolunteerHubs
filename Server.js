import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3006;


app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb://127.0.0.1:27017"; 
const client = new MongoClient(uri);



const db = client.db("VolunteerHub"); 
const staffCollection = db.collection("staff"); 
 

app.post('/add-staff', async (req, res) => {
    try {
        await client.connect();
        const staffData = req.body;
        const result = await staffCollection.insertOne(staffData);
        res.status(201).json({ message: "Staff added successfully!", staff: result });
        await client.close();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

const volunteerCollection = db.collection("volunteers");

app.post('/add-volunteer', async (req, res) => {
    try {
        await client.connect();
        const volunteerData = req.body;
        const result = await volunteerCollection.insertOne(volunteerData);
        res.status(201).json({ message: "Volunteer added successfully!", volunteer: result });
        await client.close();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/get-volunteers', async (req, res) => {
    try {
        await client.connect();
        const volunteers = await volunteerCollection.find().toArray();
        res.status(200).json(volunteers);
        await client.close();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        await client.connect();
        const staff = await staffCollection.findOne({ staffEmail: email, staffPassword: password });

        if (staff) {
            res.status(200).json({ message: "Login successful!", user: staff });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
        await client.close();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.get("/get-volunteer/:id", async (req, res) => {
    try {
        await client.connect();
        const { id } = req.params;
        console.log("Received ID:", id); // Debugging log

        const volunteer = await db.collection("volunteers").findOne({ volId: id });

        console.log("Found volunteer:", volunteer); // Debugging log

        if (volunteer) {
            res.json({ volunteer });
        } else {
            res.status(404).json({ message: "Volunteer not found" });
        }

        await client.close();
    } catch (error) {
        console.error("Error fetching volunteer:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.put("/update-volunteer/:id", async (req, res) => {
    try {
       await client.connect();
        const { id } = req.params;
        const { firstName, lastName, dob, email, password } = req.body;

        const updatedVolunteer =  await volunteerCollection.updateOne(
            { volId: id },
            { $set: { firstName, lastName, dob, email, password } }
        );

        if (updatedVolunteer.modifiedCount > 0) {
            res.json({ message: "Volunteer updated successfully" });
        } else {
            res.status(404).json({ message: "Volunteer not found or no changes made" });
        }
        await client.close();
    } catch (error) {
        console.error("Error updating volunteer:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/delete-volunteer', async (req, res) => {
    await client.connect();
    const { volId } = req.body;
    console.log("Received ID:", volId); 

    if (!volId) {
        return res.status(400).json({ message: "Volunteer ID is required" });
    }

    try {
        const result = await volunteerCollection.deleteOne({ volId: String(volId) });

        if (result.deletedCount > 0) {
            res.json({ message: "Volunteer deleted successfully" });
        } else {
            res.status(404).json({ message: "Volunteer not found" });
        }
    } catch (error) {
        console.error("Error deleting volunteer:", error);
        res.status(500).json({ message: "Error deleting volunteer", error });
    } finally {
        await client.close();
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

