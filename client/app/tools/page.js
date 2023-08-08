"use client"
import React from 'react';
import styles from '../../styles/tools.module.css'
import Image from 'next/image';
import Img1 from '../../icons/img1.png'
import Img2 from '../../icons/img2.png'
import Img3 from '../../icons/img3.png'
import Img4 from '../../icons/img4.png'
import Img5 from '../../icons/img5.png'
import Img6 from '../../icons/img6.png'
import Img7 from '../../icons/img7.png'
import Img8 from '../../icons/img8.png'
import Img9 from '../../icons/img9.png'
import Img10 from '../../icons/img10.png'
import Img11 from '../../icons/img11.png'
import Img12 from '../../icons/img12.png'
import Img13 from '../../icons/img13.png'
import Img14 from '../../icons/img14.png'
import Img15 from '../../icons/img15.png'
import Img16 from '../../icons/img16.png'
import Img17 from '../../icons/img17.png'
import Img18 from '../../icons/img18.png'
import Img19 from '../../icons/img19.png'
import Img20 from '../../icons/img20.png'
import EditIcon from '../../icons/edit_file.png'

const ToolsComponent = () => {
    const toolsData = [
        { name: "Word Sculptor", description: 'Revolutionize your academic or professional writing with Al-crafted essays, uniquely tailored to your style and topic.', imageUrl: Img1 , icon: EditIcon},
        { name: "Complexity Cutter", description: 'Transform complex, jargon-filled text into digestible, straightforward content without losing the original meaning.', imageUrl: Img2 , icon: EditIcon},
        { name: "Product Details", description: 'Generate compelling, detail-rich descriptions that amplify the appeal of your products, captivating audiences with a single read.', imageUrl: Img3 , icon: EditIcon},
        { name: "Message Magician", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', imageUrl: Img4, icon: EditIcon },
        { name: "Linkedin Optimizer", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', imageUrl: Img5, icon: EditIcon},
        { name: "Insta-Inspirer", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', imageUrl: Img6 , icon: EditIcon},
        { name: "Answer Artisan", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', imageUrl: Img7 , icon: EditIcon},
        { name: "Name Navigator", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', imageUrl: Img8 , icon: EditIcon},
        { name: "SEO Maverick", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', imageUrl: Img9 , icon: EditIcon},
        { name: "Review Ranger", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', imageUrl: Img10 , icon: EditIcon},
        { name: "Venture Incubator", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', imageUrl: Img11 , icon: EditIcon},
        { name: "Chronicle Creator", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', imageUrl: Img12 , icon: EditIcon},
        { name: "Duplication Detective", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', imageUrl: Img13 , icon: EditIcon},
        { name: "Hashtag Hero", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', imageUrl: Img14 , icon: EditIcon},
        { name: "Critter Coder", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', imageUrl: Img15 , icon: EditIcon},
        { name: "Translate Mate", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', imageUrl: Img16 , icon: EditIcon},
        { name: "Word Sculptor", description: 'Revolutionize your academic or professional writing with Al-crafted essays, uniquely tailored to your style and topic.', imageUrl: Img17 , icon: EditIcon},
        { name: "complexity cutter", description: 'Transform complex, jargon-filled text into digestible, straightforward content without losing the original meaning.', imageUrl: Img18 , icon: EditIcon},
        { name: "product details", description: 'Generate compelling, detail-rich descriptions that amplify the appeal of your products, captivating audiences with a single read.', imageUrl: Img19 , icon: EditIcon},
        { name: "message magician", description: 'Elevate your correspondence with polished, professional, and persuasive emails, personalized by Al to perfectly match your style.', imageUrl: Img20 , icon: EditIcon},
    ];

    return (
        <div className='container'>
            <div className={styles["tools-container"]}>
                <h1>Empower Your Workflow with Our Suite of Advanced Tools</h1>
                <div className={styles["tools-card-container"]}>
                    {toolsData.map((tool, index) => (
                        <div key={index} className={styles["tool-card"]}>
                            <div className={styles['icon-parent']}>
                                <Image src={tool.imageUrl} alt={tool.name} className={styles['image']} />
                                <div>
                                    <Image src={tool.icon} alt={tool.name} className={styles['icon']} />
                                </div>
                            </div>
                            <p className={styles['tool-name']}>{tool.name}</p>
                            <p>{tool.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ToolsComponent;
