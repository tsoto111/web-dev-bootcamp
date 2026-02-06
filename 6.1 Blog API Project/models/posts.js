class Posts {
    static PostsError = class extends Error {
        constructor(message) {
            super(message)
        }
    }

    constructor() {
        this.posts = [
            {
                id: 1,
                title: "The Rise of Decentralized Finance",
                content: "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
                author: "Alex Thompson",
                date: "2023-08-01T10:00:00Z",
            },
            {
                id: 2,
                title: "The Impact of Artificial Intelligence on Modern Businesses",
                content: "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
                author: "Mia Williams",
                date: "2023-08-05T14:30:00Z",
            },
            {
                id: 3,
                title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
                content: "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
                author: "Samuel Green",
                date: "2023-08-10T09:15:00Z",
            },
        ];

        this.required_fields = Object.freeze(["title", "content", "author"])
    }

    all() {
        return this.posts
    }

    find(id) {
        return this.posts.find(post => post.id === parseInt(id))
    }

    new(params) {
        this.validate_fields(params)
        const last_entry = this.last()
        const new_post = {
            id: parseInt(last_entry.id) + 1,
            title: params.title,
            content: params.content,
            author: params.author,
            date: new Date().toISOString()
        }
        this.posts.push(new_post)
        return new_post
    }

    update(id, params) {
        const target_index = this.findIndex(id)

        if (target_index < 0) {
            throw new Posts.PostsError('Post not found with id: ' + id)
        }

        Object.keys(params).forEach(param_key => {
            if (!(param_key in this.posts[target_index])) {
                throw new Posts.PostsError('Field is not supported: ' + param_key)
            }

            if ((param_key in this.required_fields) && !params[param_key]) {
                throw new Posts.PostsError('Field is required: ' + param_key)
            }

            this.posts[target_index][param_key] = params[param_key]
        })

        return this.posts[target_index]
    }

    delete(id) {
        const target_index = this.findIndex(id)

        if (target_index < 0) {
            throw new Posts.PostsError('Post not found with id: ' + id)
        }

        this.posts.splice(target_index,1)
    }

    last() {
        return this.posts.reduce((last_post, post) => Number(post.id) > Number(last_post.id) ? post : last_post, this.posts[0])
    }

    findIndex(id) {
        return this.posts.findIndex(post => Number(post.id) === Number(id))
    }

    validate_fields(params) {
        this.required_fields.forEach(required_field => {
        if (!(required_field in params)) {
          throw new Posts.PostsError('The following field is required: ' + required_field)
        }
      })
    }
}

export default Posts