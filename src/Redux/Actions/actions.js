import { ADD_CARD, DELETE_MULTIPLE_CARDS, EDIT_CARD, DELETE_CARD, ADD_BUCKET, EDIT_BUCKET, DELETE_BUCKET, MOVE_CARDS, SET_INITIAL_DATA } from "../ActionTypes/actionTypes";

// Action creator for adding a card
export const addCard = (bucketId, card) => ({
    type: ADD_CARD,
    payload: { bucketId, card },
  });

// Action creator for editing a card
export const editCard = (bucketId, cardId, updatedCard) => ({
    type: EDIT_CARD,
    payload: { bucketId, cardId, updatedCard },
  });  

// Action creator for deleting a card
export const deleteCard = (bucketId, cardId) => ({
    type: DELETE_CARD,
    payload: { bucketId, cardId },
  });  

export const deleteMultipleCards = (bucketId,cardIds) => ({
    type: DELETE_MULTIPLE_CARDS,
    payload: { bucketId, cardIds },
  });  

// Action creator for adding a bucket
export const addBucket = (bucket) => ({
    type: ADD_BUCKET,
    payload: { bucket },
  });  

// Action creator for editing a bucket
export const editBucket = (bucketId, updatedBucket) => ({
    type: EDIT_BUCKET,
    payload: { bucketId, updatedBucket },
  });
  
// Action creator for deleting a bucket
export const deleteBucket = (bucketId) => ({
    type: DELETE_BUCKET,
    payload: { bucketId },
  });  
  
  export const moveCards = (sourceBucketId, destinationBucketId, cardIds) => {
    return {
      type: MOVE_CARDS,
      payload: {sourceBucketId, destinationBucketId, cardIds}
    };
  };  

  // database calls

  export const setInitialData = (buckets) => {
    return{
      type: SET_INITIAL_DATA,
      payload: {buckets}
    }
  }