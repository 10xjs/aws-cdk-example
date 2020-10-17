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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHlDQUF5QztBQUV6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBRXhCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTyxDQUFDO0FBRTFCLFFBQUEsSUFBSSxHQUFZLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUU7O0lBQ3BELElBQUk7UUFDRixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQzlCLHVCQUF1QjtRQUN2QixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7WUFDekMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUVmLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtZQUNwQix3Q0FBd0M7WUFDeEMsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRTtnQkFDdEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3hFLE1BQU0sSUFBSSxHQUFHO29CQUNYLE9BQU8sUUFBRSxJQUFJLENBQUMsUUFBUSwwQ0FBRSxHQUFHLENBQUMsVUFBVSxDQUFDO3dCQUNyQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBQ2YsQ0FBQyxDQUFDO2lCQUNILENBQUM7Z0JBQ0YsT0FBTztvQkFDTCxVQUFVLEVBQUUsR0FBRztvQkFDZixPQUFPLEVBQUUsRUFBRTtvQkFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7aUJBQzNCLENBQUM7YUFDSDtZQUVELElBQUksVUFBVSxFQUFFO2dCQUNkLHVDQUF1QztnQkFDdkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxNQUFNO3FCQUN0QixTQUFTLENBQUM7b0JBQ1QsTUFBTSxFQUFFLFVBQVU7b0JBQ2xCLEdBQUcsRUFBRSxVQUFVO2lCQUNoQixDQUFDO3FCQUNELE9BQU8sRUFBRSxDQUFDO2dCQUNiLE1BQU0sSUFBSSxTQUFHLElBQUksQ0FBQyxJQUFJLDBDQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFMUMsT0FBTztvQkFDTCxVQUFVLEVBQUUsR0FBRztvQkFDZixPQUFPLEVBQUUsRUFBRTtvQkFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7aUJBQzNCLENBQUM7YUFDSDtTQUNGO1FBRUQsSUFBSSxNQUFNLEtBQUssTUFBTSxFQUFFO1lBQ3JCLGFBQWE7WUFDYix3Q0FBd0M7WUFDeEMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDZixPQUFPO29CQUNMLFVBQVUsRUFBRSxHQUFHO29CQUNmLE9BQU8sRUFBRSxFQUFFO29CQUNYLElBQUksRUFBRSxxQkFBcUI7aUJBQzVCLENBQUM7YUFDSDtZQUVELDRDQUE0QztZQUM1QyxNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3ZCLElBQUksSUFBSSxHQUFHLFVBQVUsR0FBRyxZQUFZLEdBQUcsR0FBRyxDQUFDO1lBRTNDLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRTdDLE1BQU0sTUFBTTtpQkFDVCxTQUFTLENBQUM7Z0JBQ1QsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLEdBQUcsRUFBRSxVQUFVO2dCQUNmLElBQUksRUFBRSxVQUFVO2dCQUNoQixXQUFXLEVBQUUsa0JBQWtCO2FBQ2hDLENBQUM7aUJBQ0QsT0FBTyxFQUFFLENBQUM7WUFFYixPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLE9BQU8sRUFBRSxFQUFFO2dCQUNYLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDcEMsQ0FBQztTQUNIO1FBRUQsSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ3ZCLGVBQWU7WUFDZiwyQ0FBMkM7WUFDM0MsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDZixPQUFPO29CQUNMLFVBQVUsRUFBRSxHQUFHO29CQUNmLE9BQU8sRUFBRSxFQUFFO29CQUNYLElBQUksRUFBRSxxQkFBcUI7aUJBQzVCLENBQUM7YUFDSDtZQUVELE1BQU0sTUFBTTtpQkFDVCxZQUFZLENBQUM7Z0JBQ1osTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLEdBQUcsRUFBRSxVQUFVO2FBQ2hCLENBQUM7aUJBQ0QsT0FBTyxFQUFFLENBQUM7WUFFYixPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLE9BQU8sRUFBRSxFQUFFO2dCQUNYLElBQUksRUFBRSw4QkFBOEIsR0FBRyxVQUFVO2FBQ2xELENBQUM7U0FDSDtRQUVELGtEQUFrRDtRQUNsRCxPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUUsRUFBRTtZQUNYLElBQUksRUFBRSw0Q0FBNEMsR0FBRyxNQUFNO1NBQzVELENBQUM7S0FDSDtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekQsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFLEVBQUU7WUFDWCxJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUM7S0FDSDtBQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHtIYW5kbGVyfSBmcm9tICdhd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIFMzIGZyb20gJ2F3cy1zZGsvY2xpZW50cy9zMyc7XG5cbmNvbnN0IGNsaWVudCA9IG5ldyBTMygpO1xuXG5jb25zdCBidWNrZXROYW1lID0gcHJvY2Vzcy5lbnYuQlVDS0VUITtcblxuZXhwb3J0IGNvbnN0IG1haW46IEhhbmRsZXIgPSBhc3luYyAoZXZlbnQsIGNvbnRleHQpID0+IHtcbiAgdHJ5IHtcbiAgICB2YXIgbWV0aG9kID0gZXZlbnQuaHR0cE1ldGhvZDtcbiAgICAvLyBHZXQgbmFtZSwgaWYgcHJlc2VudFxuICAgIHZhciB3aWRnZXROYW1lID0gZXZlbnQucGF0aC5zdGFydHNXaXRoKCcvJylcbiAgICAgID8gZXZlbnQucGF0aC5zdWJzdHJpbmcoMSlcbiAgICAgIDogZXZlbnQucGF0aDtcblxuICAgIGlmIChtZXRob2QgPT09ICdHRVQnKSB7XG4gICAgICAvLyBHRVQgLyB0byBnZXQgdGhlIG5hbWVzIG9mIGFsbCB3aWRnZXRzXG4gICAgICBpZiAoZXZlbnQucGF0aCA9PT0gJy8nKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjbGllbnQubGlzdE9iamVjdHNWMih7QnVja2V0OiBidWNrZXROYW1lfSkucHJvbWlzZSgpO1xuICAgICAgICBjb25zdCBib2R5ID0ge1xuICAgICAgICAgIHdpZGdldHM6IGRhdGEuQ29udGVudHM/Lm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGUuS2V5O1xuICAgICAgICAgIH0pLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKHdpZGdldE5hbWUpIHtcbiAgICAgICAgLy8gR0VUIC9uYW1lIHRvIGdldCBpbmZvIG9uIHdpZGdldCBuYW1lXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjbGllbnRcbiAgICAgICAgICAuZ2V0T2JqZWN0KHtcbiAgICAgICAgICAgIEJ1Y2tldDogYnVja2V0TmFtZSxcbiAgICAgICAgICAgIEtleTogd2lkZ2V0TmFtZSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5wcm9taXNlKCk7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBkYXRhLkJvZHk/LnRvU3RyaW5nKCd1dGYtOCcpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtZXRob2QgPT09ICdQT1NUJykge1xuICAgICAgLy8gUE9TVCAvbmFtZVxuICAgICAgLy8gUmV0dXJuIGVycm9yIGlmIHdlIGRvIG5vdCBoYXZlIGEgbmFtZVxuICAgICAgaWYgKCF3aWRnZXROYW1lKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICAgIGJvZHk6ICdXaWRnZXQgbmFtZSBtaXNzaW5nJyxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgLy8gQ3JlYXRlIHNvbWUgZHVtbXkgZGF0YSB0byBwb3B1bGF0ZSBvYmplY3RcbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICB2YXIgZGF0YSA9IHdpZGdldE5hbWUgKyAnIGNyZWF0ZWQ6ICcgKyBub3c7XG5cbiAgICAgIHZhciBiYXNlNjRkYXRhID0gQnVmZmVyLmZyb20oZGF0YSwgJ2JpbmFyeScpO1xuXG4gICAgICBhd2FpdCBjbGllbnRcbiAgICAgICAgLnB1dE9iamVjdCh7XG4gICAgICAgICAgQnVja2V0OiBidWNrZXROYW1lLFxuICAgICAgICAgIEtleTogd2lkZ2V0TmFtZSxcbiAgICAgICAgICBCb2R5OiBiYXNlNjRkYXRhLFxuICAgICAgICAgIENvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0pXG4gICAgICAgIC5wcm9taXNlKCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGV2ZW50LndpZGdldHMpLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAobWV0aG9kID09PSAnREVMRVRFJykge1xuICAgICAgLy8gREVMRVRFIC9uYW1lXG4gICAgICAvLyBSZXR1cm4gYW4gZXJyb3IgaWYgd2UgZG8gbm90IGhhdmUgYSBuYW1lXG4gICAgICBpZiAoIXdpZGdldE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgYm9keTogJ1dpZGdldCBuYW1lIG1pc3NpbmcnLFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBhd2FpdCBjbGllbnRcbiAgICAgICAgLmRlbGV0ZU9iamVjdCh7XG4gICAgICAgICAgQnVja2V0OiBidWNrZXROYW1lLFxuICAgICAgICAgIEtleTogd2lkZ2V0TmFtZSxcbiAgICAgICAgfSlcbiAgICAgICAgLnByb21pc2UoKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgYm9keTogJ1N1Y2Nlc3NmdWxseSBkZWxldGVkIHdpZGdldCAnICsgd2lkZ2V0TmFtZSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gV2UgZ290IHNvbWV0aGluZyBiZXNpZGVzIGEgR0VULCBQT1NULCBvciBERUxFVEVcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgaGVhZGVyczoge30sXG4gICAgICBib2R5OiAnV2Ugb25seSBhY2NlcHQgR0VULCBQT1NULCBhbmQgREVMRVRFLCBub3QgJyArIG1ldGhvZCxcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHZhciBib2R5ID0gZXJyb3Iuc3RhY2sgfHwgSlNPTi5zdHJpbmdpZnkoZXJyb3IsIG51bGwsIDIpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICBoZWFkZXJzOiB7fSxcbiAgICAgIGJvZHk6IGJvZHksXG4gICAgfTtcbiAgfVxufTtcbiJdfQ==