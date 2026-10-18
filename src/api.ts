import { demoMovies, demoDetail } from './demo'
import type { Category, Movie, MoviePage } from './types'
const token = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
const key = import.meta.env.VITE_TMDB_API_KEY
export const isDemo = !token && !key
export const imageUrl = (path:string|null, size='w500') => path ? `https://image.tmdb.org/t/p/${size}${path}` : undefined
async function request<T>(path:string, params:Record<string,string>, signal?:AbortSignal):Promise<T> {
 const search = new URLSearchParams({language:'en-US',...params,...(key?{api_key:key}:{})})
 const res = await fetch(`https://api.themoviedb.org/3/${path}?${search}`,{signal,headers:token?{Authorization:`Bearer ${token}`}:{}})
 if(!res.ok) throw new Error(res.status===401?'Your TMDB credential is invalid. Check your environment settings.':res.status===429?'Too many requests. Please try again shortly.':'Unable to reach TMDB. Please try again.')
 return res.json()
}
export async function getMovies(category:Category,query:string,page:number,signal?:AbortSignal):Promise<MoviePage> {
 if(isDemo){ let results=demoMovies.filter(m=>m.title.toLowerCase().includes(query.toLowerCase())); if(category==='top_rated')results=[...results].sort((a,b)=>b.vote_average-a.vote_average); if(category==='upcoming')results=[...results].reverse(); const total=results.length; return {results:results.slice((page-1)*6,page*6),page,total_pages:Math.ceil(total/6),total_results:total} }
 return request(query?'search/movie':`movie/${category}`,{page:String(page),include_adult:'false',...(query?{query}:{})},signal)
}
export async function getMovie(id:number,signal?:AbortSignal):Promise<Movie>{ return isDemo?demoDetail(id):request(`movie/${id}`,{append_to_response:'credits'},signal) }
