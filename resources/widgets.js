"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const S3 = require("aws-sdk/clients/s3");
const client = new S3();
const bucketName = process.env.BUCKET;
exports.main = async (event, context) => {
    var _a, _b;
    try {
        var method = event.httpMethod;
        // Get name, if present
        var widgetName = event.path.startsWith('/')
            ? event.path.substring(1)
            : event.path;
        if (method === 'GET') {
            // GET / to get the names of all widgets
            if (event.path === '/') {
                const data = await client.listObjectsV2({ Bucket: bucketName }).promise();
                const body = {
                    widgets: (_a = data.Contents) === null || _a === void 0 ? void 0 : _a.map(function (e) {
                        return e.Key;
                    }),
                };
                return {
                    statusCode: 200,
                    headers: {},
                    body: JSON.stringify(body),
                };
            }
            if (widgetName) {
                // GET /name to get info on widget name
                const data = await client
                    .getObject({
                    Bucket: bucketName,
                    Key: widgetName,
                })
                    .promise();
                const body = (_b = data.Body) === null || _b === void 0 ? void 0 : _b.toString('utf-8');
                return {
                    statusCode: 200,
                    headers: {},
                    body: JSON.stringify(body),
                };
            }
        }
        if (method === 'POST') {
            // POST /name
            // Return error if we do not have a name
            if (!widgetName) {
                return {
                    statusCode: 400,
                    headers: {},
                    body: 'Widget name missing',
                };
            }
            // Create some dummy data to populate object
            const now = new Date();
            var data = widgetName + ' created: ' + now;
            var base64data = Buffer.from(data, 'binary');
            await client
                .putObject({
                Bucket: bucketName,
                Key: widgetName,
                Body: base64data,
                ContentType: 'application/json',
            })
                .promise();
            return {
                statusCode: 200,
                headers: {},
                body: JSON.stringify(event.widgets),
            };
        }
        if (method === 'DELETE') {
            // DELETE /name
            // Return an error if we do not have a name
            if (!widgetName) {
                return {
                    statusCode: 400,
                    headers: {},
                    body: 'Widget name missing',
                };
            }
            await client
                .deleteObject({
                Bucket: bucketName,
                Key: widgetName,
            })
                .promise();
            return {
                statusCode: 200,
                headers: {},
                body: 'Successfully deleted widget ' + widgetName,
            };
        }
        // We got something besides a GET, POST, or DELETE
        return {
            statusCode: 400,
            headers: {},
            body: 'We only accept GET, POST, and DELETE, not ' + method,
        };
    }
    catch (error) {
        var body = error.stack || JSON.stringify(error, null, 2);
        return {
            statusCode: 400,
            headers: {},
            body: body,
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndpZGdldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EseUNBQXlDO0FBRXpDLE1BQU0sTUFBTSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUM7QUFFeEIsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUM7QUFFMUIsUUFBQSxJQUFJLEdBQVksS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTs7SUFDcEQsSUFBSTtRQUNGLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDOUIsdUJBQXVCO1FBQ3ZCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztZQUN6QyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRWYsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQ3BCLHdDQUF3QztZQUN4QyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFO2dCQUN0QixNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDeEUsTUFBTSxJQUFJLEdBQUc7b0JBQ1gsT0FBTyxRQUFFLElBQUksQ0FBQyxRQUFRLDBDQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUM7d0JBQ3JDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQztvQkFDZixDQUFDLENBQUM7aUJBQ0gsQ0FBQztnQkFDRixPQUFPO29CQUNMLFVBQVUsRUFBRSxHQUFHO29CQUNmLE9BQU8sRUFBRSxFQUFFO29CQUNYLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztpQkFDM0IsQ0FBQzthQUNIO1lBRUQsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsdUNBQXVDO2dCQUN2QyxNQUFNLElBQUksR0FBRyxNQUFNLE1BQU07cUJBQ3RCLFNBQVMsQ0FBQztvQkFDVCxNQUFNLEVBQUUsVUFBVTtvQkFDbEIsR0FBRyxFQUFFLFVBQVU7aUJBQ2hCLENBQUM7cUJBQ0QsT0FBTyxFQUFFLENBQUM7Z0JBQ2IsTUFBTSxJQUFJLFNBQUcsSUFBSSxDQUFDLElBQUksMENBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUUxQyxPQUFPO29CQUNMLFVBQVUsRUFBRSxHQUFHO29CQUNmLE9BQU8sRUFBRSxFQUFFO29CQUNYLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztpQkFDM0IsQ0FBQzthQUNIO1NBQ0Y7UUFFRCxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUU7WUFDckIsYUFBYTtZQUNiLHdDQUF3QztZQUN4QyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNmLE9BQU87b0JBQ0wsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLHFCQUFxQjtpQkFDNUIsQ0FBQzthQUNIO1lBRUQsNENBQTRDO1lBQzVDLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDdkIsSUFBSSxJQUFJLEdBQUcsVUFBVSxHQUFHLFlBQVksR0FBRyxHQUFHLENBQUM7WUFFM0MsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFN0MsTUFBTSxNQUFNO2lCQUNULFNBQVMsQ0FBQztnQkFDVCxNQUFNLEVBQUUsVUFBVTtnQkFDbEIsR0FBRyxFQUFFLFVBQVU7Z0JBQ2YsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFdBQVcsRUFBRSxrQkFBa0I7YUFDaEMsQ0FBQztpQkFDRCxPQUFPLEVBQUUsQ0FBQztZQUViLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUNwQyxDQUFDO1NBQ0g7UUFFRCxJQUFJLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDdkIsZUFBZTtZQUNmLDJDQUEyQztZQUMzQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNmLE9BQU87b0JBQ0wsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLHFCQUFxQjtpQkFDNUIsQ0FBQzthQUNIO1lBRUQsTUFBTSxNQUFNO2lCQUNULFlBQVksQ0FBQztnQkFDWixNQUFNLEVBQUUsVUFBVTtnQkFDbEIsR0FBRyxFQUFFLFVBQVU7YUFDaEIsQ0FBQztpQkFDRCxPQUFPLEVBQUUsQ0FBQztZQUViLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLDhCQUE4QixHQUFHLFVBQVU7YUFDbEQsQ0FBQztTQUNIO1FBRUQsa0RBQWtEO1FBQ2xELE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRSxFQUFFO1lBQ1gsSUFBSSxFQUFFLDRDQUE0QyxHQUFHLE1BQU07U0FDNUQsQ0FBQztLQUNIO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6RCxPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUUsRUFBRTtZQUNYLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztLQUNIO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge0hhbmRsZXJ9IGZyb20gJ2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgUzMgZnJvbSAnYXdzLXNkay9jbGllbnRzL3MzJztcblxuY29uc3QgY2xpZW50ID0gbmV3IFMzKCk7XG5cbmNvbnN0IGJ1Y2tldE5hbWUgPSBwcm9jZXNzLmVudi5CVUNLRVQhO1xuXG5leHBvcnQgY29uc3QgbWFpbjogSGFuZGxlciA9IGFzeW5jIChldmVudCwgY29udGV4dCkgPT4ge1xuICB0cnkge1xuICAgIHZhciBtZXRob2QgPSBldmVudC5odHRwTWV0aG9kO1xuICAgIC8vIEdldCBuYW1lLCBpZiBwcmVzZW50XG4gICAgdmFyIHdpZGdldE5hbWUgPSBldmVudC5wYXRoLnN0YXJ0c1dpdGgoJy8nKVxuICAgICAgPyBldmVudC5wYXRoLnN1YnN0cmluZygxKVxuICAgICAgOiBldmVudC5wYXRoO1xuXG4gICAgaWYgKG1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgIC8vIEdFVCAvIHRvIGdldCB0aGUgbmFtZXMgb2YgYWxsIHdpZGdldHNcbiAgICAgIGlmIChldmVudC5wYXRoID09PSAnLycpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGNsaWVudC5saXN0T2JqZWN0c1YyKHtCdWNrZXQ6IGJ1Y2tldE5hbWV9KS5wcm9taXNlKCk7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICAgICAgd2lkZ2V0czogZGF0YS5Db250ZW50cz8ubWFwKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5LZXk7XG4gICAgICAgICAgfSksXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAod2lkZ2V0TmFtZSkge1xuICAgICAgICAvLyBHRVQgL25hbWUgdG8gZ2V0IGluZm8gb24gd2lkZ2V0IG5hbWVcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGNsaWVudFxuICAgICAgICAgIC5nZXRPYmplY3Qoe1xuICAgICAgICAgICAgQnVja2V0OiBidWNrZXROYW1lLFxuICAgICAgICAgICAgS2V5OiB3aWRnZXROYW1lLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnByb21pc2UoKTtcbiAgICAgICAgY29uc3QgYm9keSA9IGRhdGEuQm9keT8udG9TdHJpbmcoJ3V0Zi04Jyk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAvLyBQT1NUIC9uYW1lXG4gICAgICAvLyBSZXR1cm4gZXJyb3IgaWYgd2UgZG8gbm90IGhhdmUgYSBuYW1lXG4gICAgICBpZiAoIXdpZGdldE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgYm9keTogJ1dpZGdldCBuYW1lIG1pc3NpbmcnLFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyBDcmVhdGUgc29tZSBkdW1teSBkYXRhIHRvIHBvcHVsYXRlIG9iamVjdFxuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgIHZhciBkYXRhID0gd2lkZ2V0TmFtZSArICcgY3JlYXRlZDogJyArIG5vdztcblxuICAgICAgdmFyIGJhc2U2NGRhdGEgPSBCdWZmZXIuZnJvbShkYXRhLCAnYmluYXJ5Jyk7XG5cbiAgICAgIGF3YWl0IGNsaWVudFxuICAgICAgICAucHV0T2JqZWN0KHtcbiAgICAgICAgICBCdWNrZXQ6IGJ1Y2tldE5hbWUsXG4gICAgICAgICAgS2V5OiB3aWRnZXROYW1lLFxuICAgICAgICAgIEJvZHk6IGJhc2U2NGRhdGEsXG4gICAgICAgICAgQ29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSlcbiAgICAgICAgLnByb21pc2UoKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnQud2lkZ2V0cyksXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChtZXRob2QgPT09ICdERUxFVEUnKSB7XG4gICAgICAvLyBERUxFVEUgL25hbWVcbiAgICAgIC8vIFJldHVybiBhbiBlcnJvciBpZiB3ZSBkbyBub3QgaGF2ZSBhIG5hbWVcbiAgICAgIGlmICghd2lkZ2V0TmFtZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICBib2R5OiAnV2lkZ2V0IG5hbWUgbWlzc2luZycsXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IGNsaWVudFxuICAgICAgICAuZGVsZXRlT2JqZWN0KHtcbiAgICAgICAgICBCdWNrZXQ6IGJ1Y2tldE5hbWUsXG4gICAgICAgICAgS2V5OiB3aWRnZXROYW1lLFxuICAgICAgICB9KVxuICAgICAgICAucHJvbWlzZSgpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICBib2R5OiAnU3VjY2Vzc2Z1bGx5IGRlbGV0ZWQgd2lkZ2V0ICcgKyB3aWRnZXROYW1lLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBXZSBnb3Qgc29tZXRoaW5nIGJlc2lkZXMgYSBHRVQsIFBPU1QsIG9yIERFTEVURVxuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICBoZWFkZXJzOiB7fSxcbiAgICAgIGJvZHk6ICdXZSBvbmx5IGFjY2VwdCBHRVQsIFBPU1QsIGFuZCBERUxFVEUsIG5vdCAnICsgbWV0aG9kLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdmFyIGJvZHkgPSBlcnJvci5zdGFjayB8fCBKU09OLnN0cmluZ2lmeShlcnJvciwgbnVsbCwgMik7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgYm9keTogYm9keSxcbiAgICB9O1xuICB9XG59O1xuIl19