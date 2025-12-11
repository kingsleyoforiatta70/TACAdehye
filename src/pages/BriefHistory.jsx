import React from 'react';
import PageLayout from '../components/PageLayout';
import { useContent } from '../context/ContentContext';

const BriefHistory = () => {
    const { pages } = useContent();
    const dbPage = pages ? pages['brief_history'] : null;

    if (dbPage && dbPage.content) {
        return (
            <PageLayout title={dbPage.title || "Brief History"}>
                <div
                    className="prose prose-lg text-gray-700 mx-auto space-y-6"
                    dangerouslySetInnerHTML={{ __html: dbPage.content }}
                />
            </PageLayout>
        );
    }

    return (
        <PageLayout title="Brief History">
            <div className="prose prose-lg text-gray-700 mx-auto space-y-6">
                <p>
                    Between 1904 and 1905, there was an outbreak of a Holy Spirit revival in Wales, United Kingdom, which had tremendous effects on many parts of the British Isles. This was followed by a mighty visitation of the Holy Spirit, which fell simultaneously on many parts of the world, during which many received the baptism of the Holy Spirit with signs following. As a result, there sprung up Pentecostal groups worldwide which also believed that the gifts of Apostles, Prophets, Evangelists, Pastors, and Teachers of Ephesians 4:11 should operate in the church together with the nine gifts of the Holy Spirit as spelt out in 1 Corinthians 12:1-11. Out of the Holy Spirit-inspired revival, The Apostolic Church was born in 1915 in Penygroes, South Wales, United Kingdom.
                </p>
                <p>
                    Subsequently, these spiritual gifts and ministries were exercised in other countries of the world. With time, the Lord in a remarkable way brought many groups to link up with The Apostolic Church in Penygroes, with the vision of "Belting the Globe with the Gospel" and Ghana (then Gold Coast) was no exception. Ghana then witnessed the emergence of Christians in the country who were seeking spiritual awakening in their hearts and lives. The desire to know more about spiritual truths drove many to communicate through correspondence for literature from various Christian missions abroad. This brought The Apostolic Church – UK into contact with a Christian prayer group at Asamankese who had experienced the baptism of the Holy Spirit and needed instructions and guidance. Under the leadership of late Apostle Peter Newman Anim, (then an Elder) they accepted to become members of The Apostolic Church and wholeheartedly embraced the Tenets of the Church. Thus, The Apostolic Church, Gold Coast (now Ghana) was officially birthed in 1935.
                </p>
                <p>
                    On 2nd March 1937, Pastor James Mckeown was sent by The Apostolic Church Missionary Board in Bradford, UK to the then Gold Coast to take up the mantle as the first resident missionary. Barely six months after his arrival, Pastor James Mckeown was taken ill with malaria fever. A controversy broke out over his admission and treatment at the European (now Ridge) Hospital in Accra. This led to a split in the infant Church with Pastor Anim leading a breakaway group to form the Christ Apostolic Church (CAC).
                </p>
                <p>
                    Despite the split, Pastor Mckeown with some young, dedicated, spirit filled members held the fort of the Apostolic flame, evangelizing everywhere and the Lord manifesting and confirming His word with signs following. The church flourished and the powers of darkness could not withstand it.
                </p>
                <p>
                    However, after a period of protracted administrative disagreements in 1953, Pastor James Mckeown also led a major split with a large section of the Church to form the Gold Coast Apostolic Church.
                </p>
                <p>
                    After Ghana's independence the Mckeown faction became the Ghana Apostolic Church, thus leaving the original Church as The Apostolic Church – Ghana. In 1962 the name "Ghana Apostolic Church" was changed to the Church of Pentecost under the directive of the then President of the Republic of Ghana, Osagyefo Dr. Kwame Nkrumah.
                </p>
                <p>
                    Many other Churches including the Divine Healers Church, The Apostolic Reformed Church, The New Covenant Apostolic Church among others are all off-shoots of The Apostolic Church – Ghana.
                </p>
                <p>
                    The Church has also been instrumental in establishing the glorious vision and the seed of the gospel in Togo, La Cote D'Ivoire, Liberia, Gambia, South Africa, Europe, and North America. The last British Missionary, Pastor E. H. Williams who arrived in 1973, strengthened the roots of the apostolic flame, by systematically organizing leadership training programmes for Ministers.
                </p>
                <p>
                    In 1985, the Church in Ghana celebrated her Golden Jubilee, and attained autonomy from the parent Apostolic Church in the United Kingdom. This led to the appointment of Apostle Austin Ofori-Addo as the first Ghanaian President. After the attainment of autonomy and the celebration of Golden Jubilee in 1985, the following has been the chronicle of Leaders of the Church.
                </p>

                <ul className="list-none space-y-2 ml-4 font-medium">
                    <li>1. Apostle Austin Ofori-Addo – 1985 – 1986</li>
                    <li>2. Apostle Peter Attah Antwi – 1986 – 1996</li>
                    <li>3. Administrative Management Committee (AMC) – 1996 – 1997</li>
                    <li>4. Presidential Board (PB) – 1997 – 1998</li>
                    <li>5. Apostle Joseph Anim – 1998 – 2006</li>
                    <li>6. Apostle John Annan Adotey – 2006 – 2011</li>
                    <li>7. Apostle Ebenezer Nsesah Abebrese – 2011 – 2015</li>
                    <li>8. Apostle Peter Okoe Mankralo – 2015 – 2019</li>
                    <li>9. Apostle Aaron Nartey Ami-Narh – 2019-to-Date</li>
                </ul>

                <p>
                    Currently the church is pursuing a strategic transformation concept termed 'The Shift Agenda', which has sparked a revolution of spiritual change through various initiatives. We believe that God is shifting His Church to a place of cutting-edge impact in this generation, ‘for the gifts and calling of God are without repentance’ Romans 11:29 (KJV).
                </p>
            </div>
        </PageLayout>
    );
};

export default BriefHistory;
