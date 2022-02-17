import gql from 'graphql-tag';
import { PAGINATION_QUERY } from '../components/Pagination'



const paginationField = () => {
    return {
        keyArgs: false,
        read(existing =[],{ args, cache}) {
            // console.log(existing,args,cache);
            const { skip, first } = args;
            //read the no. of items in the page
            const data = cache.readQuery({ query: PAGINATION_QUERY })
            // console.log(skip, first);
            const count = data?._allProductsMeta?.count;
            const page = skip/first + 1;
            const pages = Math.ceil(count/first);

            //check if we have existing items in
            const items = existing.slice(skip, skip + first).filter((x)=>x);
            
            if(items.length && items.length !== first && page === pages){
                //if no items in the page
                return items;
            }

            if(items.length !== first) {
                return false;
            }

            if(items.length){
                return items;
            }

            return false;



        },
        merge(existing, incoming, { args }) {
            const {skip, first} = args;

            const merged = existing ? existing.slice(0): [];
            for(let i = skip; i < skip + incoming.length; ++i) {
                merged[i] = incoming[i - skip];
            }
            return merged;
        }
    }
}


export default paginationField