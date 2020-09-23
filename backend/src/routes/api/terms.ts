import express from 'express';
import { Collection } from 'mongodb';

import * as langpestDB from '../../db';

interface termType {
  content: string;
  description: string;
  date: string;
  category: string;
  example: string;
}

const termColl = async (): Promise<Collection<termType>> => {
  const client = await langpestDB.get();
  const database = await client.db();
  const terms = await database.collection('terms');
  return terms;
};

const router = express.Router();

// Gets all terms
router.get('/', (req, res) => {
  termColl()
    .then((data) => data.find({}))
    .then((data) => data.toArray())
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => {
      console.log(err);
      res.status(500).json({ msg: 'Internal server error sorry' });
    });
});

// Return a specific task with specific content
router.get('/:term', async (req, res) => {
  try {
    const collection = await termColl();
    const cursor = await collection.find({ content: req.params.content });
    if (await cursor.hasNext()) {
      return res.status(200).json(await cursor.next());
    }
    return res.status(404).json({ msg: "Couldn't find term!" });
  } catch (err) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// Update a specific term with specific description
router.put('/:term', async (req, res) => {
  const query = { content: req.params.content };
  let queriedTask: any;
  try {
    const collection = await termColl();
    const cursor = await collection.find(query);
    if (await cursor.hasNext()) {
      queriedTask = await cursor.next();
    } else {
      return res.status(404).json({ msg: "Couldn't find user!" });
    }
    // Do some checking here
    const updateTerm = {
      $set: {
        content: req.body.content ? req.body.content : queriedTask.content,
        description: req.body.description
          ? req.body.description
          : queriedTask.description,
        date: req.body.date ? req.body.date : queriedTask.date,
        category: req.body.category ? req.body.category : queriedTask.category,
        example: req.body.example ? req.body.example : queriedTask.example,
      },
    };
    // Put updated values in
    await collection.updateOne(query, updateTerm);
    return res.status(200).json({ msg: 'Successfully updated term' });
  } catch (err) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// Create a specifc term
router.post('/:term', async (req, res) => {
  try {
    const collection = await termColl();
    const cursor = await collection.find({ term: req.params.term });
    if (await cursor.hasNext()) {
      return res.status(400).json({ msg: 'Term already exists' });
    }
    // Do some checking here
    const newTerm: termType = {
      content: req.body.content,
      description: req.body.description,
      date: req.body.date,
      category: req.body.category,
      example: req.body.example,
    };
    if (newTerm.content && newTerm.description) {
      // Put updated values in
      await collection.insertOne(newTerm);
      return res.status(200).json({ msg: 'Successfully created new term' });
    }
    return res
      .status(400)
      .json({ msg: 'Please include a term and definition' });
  } catch (err) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// When you gotta delete the terms
router.delete('/:term', async (req, res) => {
  try {
    const collection = await termColl();
    const deleteResult = await collection.deleteOne({
      content: req.params.content,
    });
    if (deleteResult.deletedCount === 0) {
      return res.status(400).json({ msg: 'Term was not found' });
    }
    return res.status(200).json({ msg: 'Successuflly deleted term' });
  } catch (err) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// Return a specific user with specific id
// Implement this later if needed

export default router;
