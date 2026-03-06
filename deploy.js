
import { publish } from 'gh-pages';
import { config } from 'dotenv';

config({ path: '.env.local' });

const token = process.env.GITHUB_TOKEN;

if (!token) {
    console.error('GITHUB_TOKEN not found in .env.local');
    process.exit(1);
}

publish('dist', {
    repo: `https://${token}@github.com/jasicondeoghar-oss/jasicon2026.git`,
    user: {
        name: 'testdigixea',
        email: 'testdigixea@users.noreply.github.com'
    }
}, (err) => {
    if (err) {
        console.error('Deployment failed:', err);
        process.exit(1);
    } else {
        console.log('Deployment successful!');
    }
});
