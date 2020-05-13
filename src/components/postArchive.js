import React from "react"
import { Link } from "gatsby"
import archiveStyles from "../styles/archive.module.css"
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

class PostArchive extends React.Component {
  render() {
    const { history } = this.props;

    console.log(history);

    return (
      <div className={archiveStyles.archive}>
        <h3>Archive</h3>
        <Accordion className={archiveStyles.accordion}>
          {Object.keys(history).map((year) => (
            <AccordionItem key={year} className={archiveStyles.accordionItem}>
              <AccordionItemButton className={archiveStyles.accordionButton}>
              {year}
              </AccordionItemButton>
              <AccordionItemPanel className={archiveStyles.accordionPanel}>
                <Accordion className={archiveStyles.innerAccordion}>
                  {Object.keys(history[year]).map((month) => (
                    <AccordionItem key={month} className={archiveStyles.innerAccordionItem}>
                    <AccordionItemButton className={archiveStyles.innerAccordionButton}>
                      {month}<span>{history[year][month].postCount}</span>
                    </AccordionItemButton>
                    <AccordionItemPanel className={archiveStyles.accordionPanel}>
                        {history[year][month].posts.map((post) => (
                          <div key={post.slug} className={archiveStyles.post}>
                            <Link to={post.slug}>{post.title}</Link>
                          </div>
                        ))}
                    </AccordionItemPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
    )
  }
}

export default PostArchive