import { createServer, Model } from 'miragejs';
import { videos } from './mock-data';

export function server() {
    createServer({
        models: {
            video: Model,
            playlist: Model
        },
        routes() {
            this.get('/api/videos', (schema) => {
                return schema.videos.all();
            });
            this.post('/api/videos', (schema, request) => {
                let video = JSON.parse(request.body);
                return schema.videos.create(video);
            });
        },
        seeds(server) {
            videos.forEach(video => {
                server.create('video', video)                
            });
        }
    });
}