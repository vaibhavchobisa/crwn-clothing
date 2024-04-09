import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
    // console.log('selector 1 fired');
    return state.categories;
};

// createSelector is used to memoize selectors to avoid re-renders when there's no state
// change in a component. First argument takes an array of input selectors, second takes
// the output selector.
export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        // console.log('selector 2 fired');
        return categoriesSlice.categories;
    }  
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        // console.log('selector 3 fired');
        return categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
        }, {});
    }
    );

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)


// export const  selectCategoriesMap =  (state) => {
// console.log('selector fired')
// return state.categories.categories.reduce((acc, category) => {
//     // console.log(category);
//         const { title, items } = category;
//         // console.log(title);
//         // console.log(items);
//         // console.log(acc);
//         acc[title.toLowerCase()] = items;
//         // console.log(acc);
//         return acc;
//     }, {});
// }