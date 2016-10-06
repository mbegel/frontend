import {Record, Schema} from 'js-data';
import {IActionOpts} from 'js-data-http';

import {Cluster} from './cluster';
import {Membership} from './membership';
import {ChatMember} from './chat-member';
import * as _ from 'lodash';

export class User extends Record {
    public id: number;
    public photo;
    public clusters_id:number[];
    public last_login: Date;
    public email: string;
    public lastname: string;
    public firstname: string;
    public phone: string;
    public is_active: boolean;
    public last_modified: Date;
    public join_date: Date;

    // Relational fields
    public clusters: number[]; // clusters ids returned by REST API
    public user_clusters: UserCluster[]; // client-side only relational objects 'user_cluster'
    public memberships:Membership[];
    public chatmembers:ChatMember[];

    constructor (props?) {
        super(props);
        this.last_login = new Date();
        this.last_modified = new Date();
        this.join_date = new Date();
    }

    // Returns the clusters list as JSData Records list
    public getClusters(): Cluster[] {
        return _.reduce(this.user_clusters, c => c['cluster'], []);
    }

    // Returns the role on the specified chat
    public getChatMemberOnChat(chat_id: number): ChatMember {
        //console.log("Begin of the getChatMemberOnChat fonction, for chat_id = " + chat_id);
        for (var chatmember of this.chatmembers) {
            //console.log(chatmember);
            if(chatmember.chat.id === chat_id) {
                return chatmember;
            };
        };
        return null;
    }
}

export class UserCluster extends Record {
    public user_id: number;
    public cluster_id: number;
    public user: User;
    public cluster: Cluster;

    constructor(props) {
        super(props);
    }
}

export const userSchema = new Schema({
    properties: {
        id: {type: 'integer'},
        clusters_id : {type : 'array', items: {type: 'integer'}},
        lastname: {type: 'string'},
        firstname: {type: 'string'},
        email: {type: 'string', format: 'email'},
        phone: {type: 'string'},
        is_active: {type: 'boolean'},
        last_login: {type: 'string', format: 'date-time'},
        last_modified: {type: 'string', format: 'date-time'},
        join_date: {type: 'string', format: 'date-time'}
    }
});

export const userRelations = {
    hasMany: {
        user_cluster: {
            foreignKey: 'user_id',
            localField: 'user_clusters'
        },
        membership: {
            foreignKey: 'user_id',
            localField: 'memberships'
        },
        chatmember: {
            foreignKey: 'user_id',
            localField: 'chatmembers'
        }
    }
};

export const userActions : { [key: string]: IActionOpts; } = {
    'me': {
        adapter: 'http',
        pathname: 'me',
        response: (u) => { return new User(u.data); }
    }
};
