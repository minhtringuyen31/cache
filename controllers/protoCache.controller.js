import { ProtoCacheService } from '../services/service.js'
import redisClient from '../config/redis.js'

const ProtoController = {
    saveData: async (req, res, next) => {
        try {
            const { userId, referenceId, type, page } = req.body
            const time = new Date().getTime()
            const key = userId
            const value = `${referenceId}-${type}-${page}-${time.toString()}`
            await ProtoCacheService.saveData(key, value)
            res.status(200).json({
                message: 'Save data succesfully!',
            })
        } catch (error) {
            res.status(500).send('Internal Server Error', error)
        }
    },
    getRecentActivities: async (req, res, next) => {
        try {
            const userId = req.params.userId
            const data = await ProtoCacheService.getRecentActivities(userId)
            const response = data
                .map((item) => {
                    const [referenceId, type, page, time] = item.split('-')
                    return {
                        referenceId: referenceId.trim(),
                        type: type.trim(),
                        page: page.trim(),
                        time: new Date(parseInt(time)).toISOString(),
                    }
                })
                .sort((a, b) => b.time - a.time)
            res.status(200).json(response)
        } catch (error) {
            res.status(500).send('Internal Server Error', error)
        }
    },
}

export default ProtoController
