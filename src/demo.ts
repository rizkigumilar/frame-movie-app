import type { Movie } from './types'
const entries = [
[693134,'Dune: Part Two','2024-02-27','/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg','/xOMo8BRK7PfcJvSsB1hK5tM6iQL.jpg',8.2,'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between love and the fate of the universe, he must prevent a terrible future only he can foresee.'],
[872585,'Oppenheimer','2023-07-19','/ptpr0kGAckfQkJeJIt8st5dglvd.jpg','/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg',8.1,'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.'],
[157336,'Interstellar','2014-11-05','/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg','/pbrkL804c8yAv3zBZR4QPEafpAR.jpg',8.4,'A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.'],
[414906,'The Batman','2022-03-01','/74xTEgt7R36Fpooo50r9T25onhq.jpg','/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',7.7,'Batman ventures into Gotham City’s underworld when a killer leaves behind a trail of cryptic clues.'],
[569094,'Spider-Man: Across the Spider-Verse','2023-05-31','/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',null,8.4,'Miles Morales journeys across the multiverse and encounters a team of Spider-People.'],
[346698,'Barbie','2023-07-19','/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',null,7.0,'Barbie and Ken discover the joys and perils of living among humans.'],
[496243,'Parasite','2019-05-30','/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',null,8.5,'A struggling family finds an unexpected opportunity in the home of a wealthy household.'],
[545611,'Everything Everywhere All at Once','2022-03-24','/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',null,7.8,'An unlikely hero must channel her newfound powers to fight dangers from the multiverse.'],
[27205,'Inception','2010-07-15','/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',null,8.4,'A skilled thief is offered a chance at redemption with an impossible task: plant an idea in a dream.'],
[680,'Pulp Fiction','1994-09-10','/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',null,8.5,'The lives of two hitmen, a boxer, and a pair of bandits intertwine in Los Angeles.'],
[438631,'Dune','2021-09-15','/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',null,7.8,'A gifted young man must travel to the most dangerous planet in the universe.'],
[24428,'The Avengers','2012-04-25','/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',null,7.7,'Earth’s mightiest heroes must come together to stop an alien invasion.']
] as const
export const demoMovies: Movie[] = entries.map(([id,title,release_date,poster_path,backdrop_path,vote_average,overview]) => ({id,title,release_date,poster_path,backdrop_path,vote_average,overview,genre_ids:[18,878]}))
export function demoDetail(id:number):Movie { const m = demoMovies.find(m=>m.id===id); if(!m) throw new Error('Movie not found.'); return {...m,runtime: id===693134?167:148,genres:[{id:18,name:'Drama'},{id:878,name:'Science Fiction'}],tagline:id===693134?'Long live the fighters.':'Every story opens a new world.',credits:{cast: id===693134?[{id:1,name:'Timothée Chalamet',character:'Paul Atreides',profile_path:null},{id:2,name:'Zendaya',character:'Chani',profile_path:null},{id:3,name:'Rebecca Ferguson',character:'Lady Jessica',profile_path:null}]:[],crew: id===693134?[{name:'Denis Villeneuve',job:'Director'}]:[]}} }
