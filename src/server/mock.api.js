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
            this.get('/api/playlists', (schema) => {
                return schema.playlists.all();
            });
            this.post('/api/playlists', (schema, request) => {
                let playlist = JSON.parse(request.body);
                return schema.playlists.create(playlist);
            });
        },
        seeds(server) {
            videos.forEach(video => {
                server.create('video', video)                
            });
        }
    });
}