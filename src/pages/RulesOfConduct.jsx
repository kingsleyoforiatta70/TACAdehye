import React from 'react';
import PageLayout from '../components/PageLayout';
import { useContent } from '../context/ContentContext';

const RulesOfConduct = () => {
    const { pages } = useContent();
    const dbPage = pages ? pages['rules_of_conduct'] : null;

    if (dbPage && dbPage.content) {
        return (
            <PageLayout title={dbPage.title || "Rules of Conduct"}>
                <div
                    className="prose prose-lg text-gray-700 mx-auto space-y-6"
                    dangerouslySetInnerHTML={{ __html: dbPage.content }}
                />
            </PageLayout>
        );
    }

    return (
        <PageLayout title="Rules of Conduct">
            <div className="prose prose-lg text-gray-700 mx-auto">
                <ul className="space-y-6">
                    <li>
                        <span className="font-bold text-blue-900">1.</span> Never come to the House of God without praying before coming. (Matthew 6:7, Ephesians 6:18)
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">2.</span> Be in your seat at the commencement of the service. You will thus be a good example to those who are late and neglectful. (Genesis 22:3, Psalm 108:2, Proverbs 8:17, Song of Solomon 7:12)
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">3.</span> Bring your children with you to the House of God. Relatives and servants also have souls. It is your duty and privilege to take care of them. (Matthew 11:14, Exodus 22:10, Acts 10:24, John 1:41,45, Genesis 18:19)
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">4.</span> Make your Pastor your personal friend. His sympathy, support and counsel are needed by you. Constantly pray for him. (1 Thessalonians 2:7, Joel 2:17, Malachi 2:7, Romans 15:30, 2 Corinthians 1:11, Ephesians 6:19, Hebrews 13:17)
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">5.</span> Make the Church your spiritual home. (Acts 2:46-47, Psalm 133:1)
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">6.</span> When conversing never speak disrespectfully or criticizingly of God's servants or their ministrations, in the presence of your children. If you sow to the wind, you may expect to reap the whirlwind. (Galatians 6:7, Proverbs 22:8, Hosea 8:7)
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">7.</span> Take your Bible with you to the House of God. (Psalm 1:2, 119:16, 72, Romans 15:4, 2 Timothy 3:16-17)
                    </li>
                    <li>
                        <span className="font-bold text-blue-900">8.</span> Enter reverently, pray fervently, listen attentively, give praise from a grateful heart and worship God in the beauty of holiness. (Psalm 118:27-29, Ecclesiastes 5:1, Romans 12:11, James 1:19)
                    </li>
                </ul>
            </div>
        </PageLayout>
    );
};

export default RulesOfConduct;
