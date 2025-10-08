// // export default () => ({});
// module.exports = ({ env }) => ({
//   upload: {
//     config: {
//       provider: '@strapi/provider-upload-aws-s3',
//       providerOptions: {
//         s3Options: {
//           endpoint: `https://${env('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
//           region: 'auto', // R2 doesn’t require AWS regions
//           credentials: {
//             accessKeyId: env('R2_ACCESS_KEY_ID'),
//             secretAccessKey: env('R2_SECRET_ACCESS_KEY'),
//           },
//           params: {
//             Bucket: env('R2_BUCKET_NAME'),
//           },
//         },
//       },
//       actionOptions: {
//         upload: {},
//         delete: {},
//       },
//       // 👇 ADD THIS SECTION
//       baseUrl: env('R2_PUBLIC_URL'),
//       prefix: '',
//     },
//   },
// });

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-aws-s3',
      providerOptions: {
        s3Options: {
          endpoint: `https://${env('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
          region: 'auto',
          credentials: {
            accessKeyId: env('R2_ACCESS_KEY_ID'),
            secretAccessKey: env('R2_SECRET_ACCESS_KEY'),
          },
          params: {
            Bucket: env('R2_BUCKET_NAME'),
          },
        },
        // 👇 must be inside providerOptions
        baseUrl: env('R2_PUBLIC_URL'),
        prefix: '',
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});

