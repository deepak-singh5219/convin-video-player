import { toast } from "react-hot-toast";
import { ADD_CARD, EDIT_CARD, DELETE_CARD, ADD_BUCKET, EDIT_BUCKET, DELETE_BUCKET, DELETE_MULTIPLE_CARDS, MOVE_CARDS } from "../ActionTypes/actionTypes";
const initialState = {
    buckets: [],
  };


const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_CARD: {
            const { bucketId, card } = action.payload;
            console.log(bucketId);
            const bucketIndex = state.buckets.findIndex((bucket) => bucket.id === bucketId);
            const updatedBucket = {
              ...state.buckets[bucketIndex],
              cards: [...state.buckets[bucketIndex].cards, card],
            };
            const updatedBuckets = [...state.buckets];
            updatedBuckets[bucketIndex] = updatedBucket;
            toast.success('Card Created!');
            return { ...state, buckets: updatedBuckets };
          }
          case EDIT_CARD: {
            const { bucketId, cardId, updatedCard } = action.payload;
            const bucketIndex = state.buckets.findIndex((bucket) => bucket.id === bucketId);
            const cardIndex = state.buckets[bucketIndex].cards.findIndex((card) => card.id === cardId);
            const updatedCards = [...state.buckets[bucketIndex].cards];
            updatedCards[cardIndex] = updatedCard;
            const updatedBucket = { ...state.buckets[bucketIndex], cards: updatedCards };
            const updatedBuckets = [...state.buckets];
            updatedBuckets[bucketIndex] = updatedBucket;
            toast.success('Card Updated!');
            return { ...state, buckets: updatedBuckets };
          }
          case DELETE_CARD: {
            const { bucketId, cardId } = action.payload;
            const bucketIndex = state.buckets.findIndex((bucket) => bucket.id === bucketId);
            const updatedCards = state.buckets[bucketIndex].cards.filter((card) => card.id !== cardId);
            const updatedBucket = { ...state.buckets[bucketIndex], cards: updatedCards };
            const updatedBuckets = [...state.buckets];
            updatedBuckets[bucketIndex] = updatedBucket;
            toast.success('Card Deleted!');
            return { ...state, buckets: updatedBuckets };
          }
          case MOVE_CARDS:{
            const {sourceBucketId, destinationBucketId, cardIds} = action.payload;
            const sourceBucketIndex = state.buckets.findIndex((bucket) => bucket.id === sourceBucketId);
            const movingCards = state.buckets[sourceBucketIndex].cards.filter((card) => cardIds.includes(card.id));
            const updatedCards = state.buckets[sourceBucketIndex].cards.filter((card) => !cardIds.includes(card.id));
            const updatedSourceBucket = { ...state.buckets[sourceBucketIndex], cards: updatedCards };
            const destinationBucketIndex = state.buckets.findIndex((bucket) => bucket.id === destinationBucketId);
            const destinationBucketCards = state.buckets[destinationBucketIndex].cards;
            const updatedDestinationBucket = { ...state.buckets[destinationBucketIndex], cards: [...destinationBucketCards, ...movingCards] };
            const updatedBuckets = [...state.buckets];
            updatedBuckets[sourceBucketIndex] = updatedSourceBucket;
            updatedBuckets[destinationBucketIndex] = updatedDestinationBucket;
            toast.success('Cards Moved!');
            return { ...state, buckets: updatedBuckets };
          }
          case DELETE_MULTIPLE_CARDS: {
            const { bucketId, cardIds } = action.payload;
            const bucketIndex = state.buckets.findIndex((bucket) => bucket.id === bucketId);
            const updatedCards = state.buckets[bucketIndex].cards.filter((card) => !cardIds.includes(card.id));
            const updatedBucket = { ...state.buckets[bucketIndex], cards: updatedCards };
            const updatedBuckets = [...state.buckets];
            updatedBuckets[bucketIndex] = updatedBucket;

            toast.success('Cards Deleted!');
            return { ...state, buckets: updatedBuckets };
          }
          case ADD_BUCKET: {
            const { bucket } = action.payload;
            const buckets = [...state.buckets, bucket];
            toast.success(`${bucket.name} created!`);
            return {
              ...state,
              buckets,
            };
          }
          case EDIT_BUCKET: {
            const { bucketId, updatedBucket } = action.payload;
            const bucketIndex = state.buckets.findIndex((bucket) => bucket.id === bucketId);
            const updatedBuckets = [...state.buckets];
            updatedBuckets[bucketIndex] = updatedBucket;
              toast.success('Edit Success!');
            return { ...state, buckets:updatedBuckets}   
          }
          case DELETE_BUCKET: {
            const { bucketId } = action.payload;
            const buckets = state.buckets.filter(bucket => bucket.id !== bucketId);
            toast.success('Category Deleted!');
            return {
              ...state,
              buckets,
            };
          }
      default: return state    
    }

}

export default reducer;